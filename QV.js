function connectionOrientedClusterMatch(N, G, T, c) {
  // N: set of agents (array of integers)
  // G: bag of groups (array of arrays of integers)
  // T: array of sets (arrays of arrays) where T[i] is the groups agent i belongs to
  // c: array of contributions (floats)
  
  function K(i, h) {
    for (let j of T[i]) {
      if (h.includes(j) || h.some(x => T[x].includes(j))) {
        return Math.sqrt(c[i]);
      }
    }
    return c[i];
  }
  
  let result = 0;
  
  for (let g of G) {
    for (let i of g) {
      result += c[i] / T[i].length;
    }
  }
  
  for (let g of G) {
    for (let h of G) {
      if (g === h) continue;
      
      let term1 = 0;
      for (let i of g) {
        term1 += K(i, h) / T[i].length;
      }
      term1 = Math.sqrt(term1);
      
      let term2 = 0;
      for (let j of h) {
        term2 += K(j, g) / T[j].length;
      }
      term2 = Math.sqrt(term2);
      
      result += 2 * term1 * term2;
    }
  }
  
  return Math.sqrt(result);
}
