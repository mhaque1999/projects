def find_greater_numbers(nums):
    """Return # of times a number is followed by a greater number.

    For example, for [1, 2, 3], the answer is 3:
    - the 1 is followed by the 2 *and* the 3
    - the 2 is followed by the 3

    Examples:

        >>> find_greater_numbers([1, 2, 3])
        3

        >>> find_greater_numbers([6, 1, 2, 7])
        4

        >>> find_greater_numbers([5, 4, 3, 2, 1])
        0

        >>> find_greater_numbers([])
        0
    """

    counter = 0
    for prev_num_index in range(len(nums)):
        for next_num_index in range(prev_num_index + 1,len(nums)):
            if nums[prev_num_index] < nums[next_num_index]:
                counter += 1
    
    return counter
