function connectionOrientedClusterMatch(N, G, T, c) {
  // N: set of agents (array of integers)
  // G: bag of groups (array of arrays of integers)
  // T: array of sets (arrays of arrays) where T[i] is the groups agent i belongs to
  // c: array of contributions (floats)
  function K(i, h) {
    // If h includes i or any member of h belongs to a group that i belongs to
    if (h.indexOf(i) !== -1 || h.some(x => T[x].indexOf(i) !== -1)) {
      return Math.sqrt(c[i]);
    }
    return c[i];
  }
  
  // Calculate the contribution of each group
  const groupContribs = G.map(g => {
    return g.reduce((acc, i) => acc + c[i] / T[i].length, 0);
  });
  
  // Sum up the group contributions
  let result = groupContribs.reduce((acc, contrib) => acc + contrib, 0);
  
  // Iterate over each pair of groups and add their contribution to the result
  for (let g of G) {
    for (let h of G) {
      if (g === h) continue; // Skip if the groups are the same
      
      // Calculate term1 for the current pair of groups
      const term1 = Math.sqrt(g.reduce((acc, i) => acc + K(i, h) / T[i].length, 0));
      
      // Calculate term2 for the current pair of groups
      const term2 = Math.sqrt(h.reduce((acc, j) => acc + K(j, g) / T[j].length, 0));
      
      result += 2 * term1 * term2;
    }
  }
  
  return Math.sqrt(result);
}
