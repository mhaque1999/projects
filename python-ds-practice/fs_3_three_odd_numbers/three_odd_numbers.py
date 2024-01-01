def three_odd_numbers(nums):
    """Is the sum of any 3 sequential numbers odd?"

        >>> three_odd_numbers([1, 2, 3, 4, 5])
        True

        >>> three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0])
        True

        >>> three_odd_numbers([5, 2, 1])
        False

        >>> three_odd_numbers([1, 2, 3, 3, 2])
        False
    """
    total = 0

    for prev_num_index in range(len(nums)):
        temp_arry = nums[prev_num_index : prev_num_index + 3]

        if len(temp_arry) != 3:
            break
        total = temp_arry[0] + temp_arry[1] + temp_arry[2]

        if total % 2 == 1:
            #print(total)
            return True
        total = 0
    return False

