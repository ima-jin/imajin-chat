import { NextRequest } from 'next/server';
import { eq, desc, and, or } from 'drizzle-orm';
import { db, conversations, participants, messages } from '@/db';
import { requireAuth } from '@/lib/auth';
import { jsonResponse, errorResponse, generateId, isValidDid } from '@/lib/utils';

/**
 * GET /api/conversations - List conversations for authenticated user
 */
export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if ('error' in authResult) {
    return errorResponse(authResult.error, authResult.status);
  }

  const { identity } = authResult;

  try {
    // Get all conversations where user is a participant
    const userConversations = await db
      .select({
        conversation: conversations,
        participant: participants,
      })
      .from(participants)
      .innerJoin(conversations, eq(participants.conversationId, conversations.id))
      .where(eq(participants.did, identity.id))
      .orderBy(desc(conversations.lastMessageAt));

    return jsonResponse({
      conversations: userConversations.map(({ conversation, participant }) => ({
        ...conversation,
        myRole: participant.role,
        muted: participant.muted,
        lastReadAt: participant.lastReadAt,
      })),
    });
  } catch (error) {
    console.error('Failed to list conversations:', error);
    return errorResponse('Failed to list conversations', 500);
  }
}

/**
 * POST /api/conversations - Create a new conversation
 */
export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request);
  if ('error' in authResult) {
    return errorResponse(authResult.error, authResult.status);
  }

  const { identity } = authResult;

  try {
    const body = await request.json();
    const { type, name, description, participantDids, visibility = 'private' } = body;

    // Validate type
    if (!type || !['direct', 'group'].includes(type)) {
      return errorResponse('type must be "direct" or "group"');
    }

    // Validate participants
    if (!participantDids || !Array.isArray(participantDids) || participantDids.length === 0) {
      return errorResponse('participantDids is required');
    }

    for (const did of participantDids) {
      if (!isValidDid(did)) {
        return errorResponse(`Invalid DID: ${did}`);
      }
    }

    // For direct messages, ensure exactly one other participant
    if (type === 'direct') {
      if (participantDids.length !== 1) {
        return errorResponse('Direct conversations must have exactly one other participant');
      }
      
      // Check if direct conversation already exists
      const otherDid = participantDids[0];
      const existing = await db
        .select()
        .from(conversations)
        .innerJoin(participants, eq(participants.conversationId, conversations.id))
        .where(
          and(
            eq(conversations.type, 'direct'),
            or(
              eq(participants.did, identity.id),
              eq(participants.did, otherDid)
            )
          )
        );
      
      // Group by conversation and check if both users are in the same one
      const convCounts: Record<string, Set<string>> = {};
      for (const row of existing) {
        if (!convCounts[row.conversations.id]) {
          convCounts[row.conversations.id] = new Set();
        }
        convCounts[row.conversations.id].add(row.participants.did);
      }
      
      for (const [convId, dids] of Object.entries(convCounts)) {
        if (dids.has(identity.id) && dids.has(otherDid)) {
          // Return existing conversation
          const conv = await db.query.conversations.findFirst({
            where: eq(conversations.id, convId),
          });
          return jsonResponse({ conversation: conv, existing: true });
        }
      }
    }

    // Groups need a name
    if (type === 'group' && !name) {
      return errorResponse('Group conversations require a name');
    }

    // Create conversation
    const conversationId = generateId('conv');
    
    await db.insert(conversations).values({
      id: conversationId,
      type,
      name: name || null,
      description: description || null,
      visibility,
      createdBy: identity.id,
    });

    // Add creator as owner
    await db.insert(participants).values({
      conversationId,
      did: identity.id,
      role: 'owner',
      invitedBy: null,
    });

    // Add other participants as members
    for (const did of participantDids) {
      if (did !== identity.id) {
        await db.insert(participants).values({
          conversationId,
          did,
          role: 'member',
          invitedBy: identity.id,
        });
      }
    }

    // Add system message for group creation
    if (type === 'group') {
      await db.insert(messages).values({
        id: generateId('msg'),
        conversationId,
        fromDid: identity.id,
        content: { type: 'system', text: `${identity.id} created the group` },
        contentType: 'system',
      });
    }

    const conversation = await db.query.conversations.findFirst({
      where: eq(conversations.id, conversationId),
    });

    return jsonResponse({ conversation }, 201);
  } catch (error) {
    console.error('Failed to create conversation:', error);
    return errorResponse('Failed to create conversation', 500);
  }
}
