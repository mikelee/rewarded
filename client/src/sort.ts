function quickSort<T extends { text: string, timestamp: string }>(items: T[], compare: (item1: T, item2: T) => boolean, left: number = 0, right: number = items.length - 1) {
    if (left < right) {
        const partitionIndex = partition(items, left, right);

        quickSort(items, compare, left, partitionIndex - 1);
        quickSort(items, compare, partitionIndex + 1, right);
    }

    return items;

    function partition(items: T[], left: number, right: number) {
        const pivotItem = items[right];
        // keeps track of index of last item that is ordered before pivot
        let i = left - 1;

        // scans for items to be placed before pivot and moves them to the beginning while updating i
        for (let j = i + 1; j < right; j++) {
            if (compare(items[j], pivotItem)) {
                i++;
                swap(items, i, j);
            }
        }

        // place pivot where it belongs
        swap(items, i + 1, right);
        return i + 1;
    }

    function swap(items: T[], item1Index: number, item2Index: number) {
        const temp = items[item1Index];
        items[item1Index] = items[item2Index];
        items[item2Index] = temp;
    }
}

// Compare functions
// All compare functions return true if the first argument should come before the second argument

function newestFirst<T extends { timestamp: string }>(item1: T, item2: T) {
    return item1.timestamp > item2.timestamp ? true : false;
}

function oldestFirst<T extends { timestamp: string }>(item1: T, item2: T) {
    return item1.timestamp < item2.timestamp ? true : false;
}

function AZ<T extends { text: string }>(item1: T, item2: T) {
    return item1.text.toLowerCase() < item2.text.toLowerCase() ? true : false;
}

function ZA<T extends { text: string }>(item1: T, item2: T) {
    return item1.text.toLowerCase() > item2.text.toLowerCase() ? true : false;
}

// Group completed items together

function groupCompletedLast<T extends { completed: boolean }>(items: T[]) {
    const beginning: T[] = [];
    const end: T[] = [];

    items.forEach(item => {
        if (item.completed) {
            end.push(item);
        } else {
            beginning.push(item);
        }
    });

    return {
        beginning,
        end
    }
}

// Sort functions
// All sort functions sort completed at the end

export function sortNewest<T extends { completed: boolean, text: string, timestamp: string }>(items: T[]) {
    const { beginning, end } = groupCompletedLast(items);

    const sortedItems = [
        ...quickSort(beginning, newestFirst),
        ...quickSort(end, newestFirst)
    ];

    return sortedItems;
}


export function sortOldest<T extends { completed: boolean, text: string, timestamp: string }>(items: T[]) {
    const { beginning, end } = groupCompletedLast(items);

    const sortedItems = [
        ...quickSort(beginning, oldestFirst),
        ...quickSort(end, oldestFirst)
    ];

    return sortedItems;
}

export function sortAZ<T extends { completed: boolean, text: string, timestamp: string }>(items: T[]) {
    const { beginning, end } = groupCompletedLast(items);

    const sortedItems = [
        ...quickSort(beginning, AZ),
        ...quickSort(end, AZ)
    ];

    return sortedItems;
}

export function sortZA<T extends { completed: boolean, text: string, timestamp: string }>(items: T[]) {
    const { beginning, end } = groupCompletedLast(items);

    const sortedItems = [
        ...quickSort(beginning, ZA),
        ...quickSort(end, ZA)
    ];

    return sortedItems;
}