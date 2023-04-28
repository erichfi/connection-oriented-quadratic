def cluster_match(groups, contributions)
    group_memberships_map = Array.new(contributions.length) { [] }
  
    groups.each_with_index do |group, i|
      group.each do |j|
        group_memberships_map[j] << i
      end
    end
  
    common_group = lambda do |i, j|
      group_memberships_map[i].any? { |group| group_memberships_map[j].include?(group) }
    end
  
    k = lambda do |i, group|
      if group.include?(i) || group.any? { |j| common_group.call(i, j) }
        Math.sqrt(contributions[i])
      else
        contributions[i]
      end
    end
  
    result = 0
  
    groups.each do |g|
      g.each do |i|
        result += contributions[i] / group_memberships_map[i].length
      end
    end
  
    groups.each do |g|
      groups.each do |h|
        next if g == h
  
        term1 = 0
        g.each do |i|
          term1 += k.call(i, h) / group_memberships_map[i].length
        end
        term1 = Math.sqrt(term1)
  
        term2 = 0
        h.each do |j|
          term2 += k.call(j, g) / group_memberships_map[j].length
        end
        term2 = Math.sqrt(term2)
  
        result += term1 * term2
      end
    end
  
    Math.sqrt(result)
  end
