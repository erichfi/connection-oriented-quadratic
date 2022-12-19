/* 
Let us introduce some notation. Let N = {1, . . . , n} be a set of agents and let G be a bag of
groups2. Each group g ∈ G is a non-empty subset of N . Let Ti denote the groups to which agent
i belongs. We will sometimes refer to G as the “group structure”.
In this paper, we can think about one project at a time, so we do not need any notation for
differentiating projects. Let ci denote the contribution of agent i to a project, and let c be the
vector of all contributions. For a group g ∈ G, let cg denote the combined contributions of every
group member, i.e., cg = ∑i∈G ci.
*/

function K(i, h) {
  if (h.includes(i) || h.some(j => intersection(T[i], T[j]).length >= 1)) {
    const sqrtCi = Math.sqrt(Math.abs(c[i]));
    return Math.sign(c[i]) * sqrtCi;
  } else {
    return c[i];
  }
}

function connectionOrientedClusterMatch(G) {
  let sum = 0;

  // Add all group contributions
  for (const g of G) {
    for (const i of g) {
      sum += c[i] / T[i].length;
    }
  }

  // Calculate interaction terms
  for (let g = 0; g < G.length; g++) {
    for (let h = g + 1; h < G.length; h++) {
      const gSum = G[g].reduce((acc, i) => acc + K(i, G[h]) / T[i].length, 0);
      const hSum = G[h].reduce((acc, i) => acc + K(i, G[g]) / T[i].length, 0);
      const sqrtGSum = Math.sqrt(Math.abs(gSum));
      const sqrtHSum = Math.sqrt(Math.abs(hSum));
      sum += 2 * Math.sign(gSum) * sqrtGSum * Math.sign(hSum) * sqrtHSum;
    }
  }

  const sqrtSum = Math.sqrt(Math.abs(sum));
  return Math.sign(sum) * sqrtSum;
}
