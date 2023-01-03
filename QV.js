function clusterMatch(groups, contributions) {
  // groups: bag of groups (array of arrays of integers)
  // contributions: array of contributions (floats)
  // groupMemberships: array of sets (arrays of arrays) where
  //                   groupMemberships[i] is the groups agent i belongs to
  let groupMemberships = new Array(contributions.length).fill([]);

  for (let i = 0; i < groups.length; i++) {
    for (let j of groups[i]) {
      groupMemberships[j] = [...groupMemberships[j], i];
    }
  }

  function commonGroup(i, j) {
   // If voter i and voter j share any common group, return true. Else return false.
   return groupMemberships[i].some(group => groupMemberships[j].includes(group))
  }

  function K(i, group) {
    // If group includes voter i, or any member of group shares a different group with voter i
    if (group.includes(i) || group.some(j => commonGroup(i, j))) {
      return Math.sqrt(contributions[i]);
    }
    return contributions[i];
  }

  let result = 0;

  // Add the contribution of each agent in each group to the result
  for (let g of groups) {
    for (let i of g) {
      result += contributions[i] / groupMemberships[i].length;
    }
  }

  // Iterate over each pair of groups and add their contribution to the result
  for (let g of groups) {
    for (let h of groups) {
      if (g === h) continue; // Skip if the groups are the same

      let term1 = 0;
      // Calculate term1 for the current pair of groups
      for (let i of g) {
        term1 += K(i, h) / groupMemberships[i].length;
      }
      term1 = Math.sqrt(term1);

      let term2 = 0;
      // Calculate term2 for the current pair of groups
      for (let j of h) {
        term2 += K(j, g) / groupMemberships[j].length;
      }
      term2 = Math.sqrt(term2);

      result += term1 * term2;
    }
  }

  return Math.sqrt(result);
}
