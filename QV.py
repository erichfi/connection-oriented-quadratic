import math

def clusterMatch(groups, contributions):
    """
    Finds the contribution of each group and the contribution of each pair of groups
    to the result.

    Parameters:
    groups (list of lists of integers): bag of groups.
    contributions (list of floats): array of contributions.

    Returns:
    float: the square root of the result.
    """
    group_memberships = [[] for _ in contributions]

    # Build group memberships for each agent
    for i, group in enumerate(groups):
        for j in group:
            group_memberships[j].append(i)

    def common_group(i, j):
        """
        Returns True if voter i and voter j share any common group. Else returns False.
        """
        return any(group in group_memberships[j] for group in group_memberships[i])

    def K(i, group):
        """
        Returns the square root of contributions[i] if group includes voter i, or any member
        of group shares a different group with voter i. Else returns contributions[i].
        """
        if i in group or any(common_group(i, j) for j in group):
            return math.sqrt(contributions[i])
        return contributions[i]

    result = 0

    # Add the contribution of each agent in each group to the result
    for g in groups:
        for i in g:
            result += contributions[i] / len(group_memberships[i])

    # Iterate over each pair of groups and add their contribution to the result
    for g in groups:
        for h in groups:
            if g == h:
                continue

            term1 = sum(K(i, h) / len(group_memberships[i]) for i in g)
            term1 = math.sqrt(term1)

            term2 = sum(K(j, g) / len(group_memberships[j]) for j in h)
            term2 = math.sqrt(term2)

            result += term1 * term2

    return math.sqrt(result)
