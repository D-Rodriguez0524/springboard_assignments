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

    # Make new dict to count the freq
    new_dict = {}
    for num in nums:
        new_dict[num] = new_dict.get(num, 0) + 1

    # finding the highest value AKA most frequent number
    max_value = max(new_dict.values())

    # finding where the highest value is at
    for (num, freq) in new_dict.items():
        if freq == max_value:
            return num
