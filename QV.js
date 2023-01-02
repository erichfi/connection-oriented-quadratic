function connectionOrientedClusterMatch(G, T, c) {
  // N: set of agents (array of integers)
  // G: bag of groups (array of arrays of integers)
  // T: array of sets (arrays of arrays) where T[i] is the groups agent i belongs to
  // c: array of contributions (floats)
  
  function commonGroup(i, j) {
   // If i and j share any common group, return true. Else return false.
   return T[i].some(group => T[j].includes(group))
  }
  
  function K(i, h) {
    // If h includes i or any member of h belongs to a group that i belongs to
    if (h.includes(i) || h.some(x => commonGroup(x, i))) {
      return Math.sqrt(c[i]);
    }
    return c[i];
  }
  
  let result = 0;
  
  // Add the contribution of each agent in each group to the result
  
  for (let g of G) {
    for (let i of g) {
      result += c[i] / T[i].length;
    }
  }
  
  // Iterate over each pair of groups and add their contribution to the result
  
  for (let g of G) {
    for (let h of G) {
      if (g === h) continue; // Skip if the groups are the same
      
      let term1 = 0;
      // Calculate term1 for the current pair of groups
      for (let i of g) {
        term1 += K(i, h) / T[i].length;
      }
      term1 = Math.sqrt(term1);
      
      let term2 = 0;
      // Calculate term2 for the current pair of groups
      for (let j of h) {
        term2 += K(j, g) / T[j].length;
      }
      term2 = Math.sqrt(term2);
      
      result += term1 * term2;
    }
  }
  
  return Math.sqrt(result);
}
