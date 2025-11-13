export function buildPublicUrl(req, relativePath) {
  const base = `${req.protocol}://${req.get('host')}`;
  return `${base}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;
}
