import math

def cluster_match(groups, contributions):
    """
    groups: bag of groups (list of lists of integers)
    contributions: list of contributions (floats)
    group_memberships: list of sets (lists of lists) where
                        group_memberships[i] is the groups agent i belongs to
    """
    group_memberships = [[] for _ in range(len(contributions))]

    for i in range(len(groups)):
        for j in groups[i]:
            group_memberships[j].append(i)

    def common_group(i, j):
        """
        If voter i and voter j share any common group, return true. Else return false.
        """
        return any(group in group_memberships[j] for group in group_memberships[i])

    def K(i, group):
        """
        If group includes voter i, or any member of group shares a different group with voter i
        """
        if i in group or any(common_group(i, j) for j in group):
            return math.sqrt(contributions[i])
        return contributions[i]

    result = 0

    for g in groups:
        for i in g:
            result += contributions[i] / len(group_memberships[i])

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
