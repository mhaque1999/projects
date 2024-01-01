def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """

    occurance_dict = {}
    occurance_key = 0
    occurance = 0
    for num in nums:
        occurance_dict[num] = nums.count(num)
    
    for num in occurance_dict.keys():
        if occurance_dict.get(num) > occurance:
            occurance = occurance_dict.get(num)
            occurance_key = num

    return occurance_key
