function sanitize(str, opts) {
  var split, i;

  if (!str) return '';
  opts = opts || {};
  
  str = str.toLowerCase()
    .replace(/^\s+/, '')
    .replace(/\s+$/, '')
    .replace(/\s+/g, '_')
    .replace(/[áàâãåäæª]/g, 'a')
    .replace(/[éèêëЄ€]/g, 'e')
    .replace(/[íìîï]/g, 'i')
    .replace(/[óòôõöøº]/g, 'o')
    .replace(/[úùûü]/g, 'u')
    .replace(/[ç¢©]/g, 'c')
    .replace(/[^a-z0-9_\-]/g, '_');

  if (opts && opts.capitalized) {
    split = str.split(/_+/g);
    for (i = 0; i < split.length; i++) {
      if (split[i]) split[i] = split[i][0].toUpperCase() + split[i].slice(1);
    }
    return split.join('');
  }

  return str.replace(/_+/g, '_');
}