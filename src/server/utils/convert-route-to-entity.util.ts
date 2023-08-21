const mapping: Record<string, string> = {
  chats: 'chat',
  invitations: 'invitation',
  messages: 'message',
  models: 'model',
  organizations: 'organization',
  roles: 'role',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
