---
author: Alex Neville
date: 2023-01-11
title: Searching and Sorting
---

A sorting function orders elements according to a _comparison function_.
Sometimes, as is the case with numeric records, a bespoke comparison
function is not explicitly required.

## Sorting Strategies

1.  **Selection:** Find the correct value for a given position in the
    output data structure.
2.  **Insertion:** Find the correct position in the output data
    structure for a given element from the input space.
3.  **Exchange:** If two elements in the input space are out of order,
    swap their positions.
4.  **Divide & Conquer:** Recursively divide the input into smaller
    sub-problems and reassemble, preserving order into the output data.

## Stability

The relative order of two records with the same key is preserved by a
_stable_ sorting algorithm. A combination of stable sorting algorithms
can form a sorting _pipeline_ and underlying elements are ordered by a
combination of conditions.

## Bubble Sort

Bubble sort is a stable, in-place, comparison-based, exchange sort
algorithm. After $i$ iterations, $i$ elements are in the correct
position. In the worst and average cases, bubble sort performs $O(n^2)$
comparisons and swaps $O(n^2)$ elements. In the best case, bubble sort
performs $O(n)$ comparisons and $O(1)$ swaps, efficient for fully or
mostly sorted lists. The space complexity is constant (no auxiliary
space required).

<div>

[Two common bubblesort implementations]{.label}

```{.text}
bubblesort(a[],n) {
    for (i = 0; i < n - 1; i++)
        for (j = 0; j < n - i - 1; j++)
            if (a[j] > a[j+1])
                swap(a[j], a[j+1]);
}
bubblesort(a[],n) {
    for (i = 1; i < n; i++)
        for (j = n - 1; j >= i; j--)
            if (a[j] < a[j-1])
                swap(a[j], a[j-1]);
}
```

</div>

## Insertion Sort

Insertion sort may be implemented as a stable, in-place,
comparison-based, insertion sort algorithm. After $i$ iterations, $i$
elements are correctly ordered relative to each other (but not
necessarily in their final position). In the worst and average cases,
insertion sort performs $O(n^2)$ comparisons and swaps $O(n^2)$
elements. In the best case, bubble sort performs $O(n)$ comparisons and
$O(1)$ swaps, ideal for fully or mostly sorted lists. The space
complexity (no auxiliary space required) is constant if the output array
grows inside the input array.

<div>

[Insertion sort implementation]{.label}

```{.text}
insertionsort(a[],n) {
    for (i = 1; i < n; i++){
        j = i;
        while (j > 0 && a[j] < a[j-1]) {
            swap(a[j], a[j-1]);
            j--;
        }
    }
}
```

</div>

## Selection Sort

Selection sort may be implemented as a stable, in-place,
comparison-based, selection sort algorithm. After $i$ iterations, $i$
elements are in the correct position. In the worst and average cases,
insertion sort performs $O(n^2)$ comparisons and swaps $O(n)$ elements.
In the best case, bubble sort performs $O(n^2)$ comparisons and $O(1)$
swaps. The space complexity is constant (no auxiliary space required) if
the output array grows inside the input array.

<div>

[Selection sort implementation]{.label}

```{.text}
selectionsort(a[],n) {
    for (i = 0; i < n - 1; i++) {
        k = i;
        for (j = i + 1; j < n; j++)
            if (a[j] < a[k]) k = j;
        if (k != i) swap(a[i], a[k]);
    }
}
```

</div>

## Merge Sort

Merge sort is a more efficient stable, comparison-based
divide-and-conquer sorting algorithm. The list to be sorted is
recursively divided into two sub-lists until the base case - the list of
length one - is reached. Sub-lists are merged together by taking the
smallest of either sorted sub-list as the next element of the sorted
list. Merge sort is $\Theta(n \log n)$ in the best, worst and average
cases. Merge sort additionally requires $O(n)$ of auxiliary space to act
as a buffer for merging sub-lists if the sort acts on an array.

<div>

[Merge sort implementation]{.label}

```{.text}
mergesort(a[], l, r) {
    if (l < r) {
        m = (l + r) // 2;
        mergesort(a, l, m);
        mergesort(a, m + 1, r);
        mergesublists(a, l, m, r);
    }
}
mergesublists(a[], l, m, r) {
    n = (r - l) + 1
    new b[n];
    i = l;
    j = m + 1;
    k = 0;
    while ((i <= m) && (j <= r)) {
        if (a[i] < a[j]) b[k++] = a[i++];
        else b[k++] = a[j++]
    }
    while (i <= m) b[k++] = a[i++];
    while (j <= r) b[k++] = a[j++];
    for (x = 0; x < n; x++) a[l + x] = b[x];
}
```

</div>

## QuickSort

Quicksort is an efficient comparison-based divide-and-conquer sorting
algorithm. At each recursive level a partition element is chosen
according to some algorithm and all smaller elements are arranged to the
left and all larger elements are arranged to the right. A recursive call
is made to sort each sub-list, to the left and right of the partition.

The choice of pivot is a significant factor in the performance of
quicksort. If an extreme (large or small) element is chosen, one
partition will have considerably more elements than than the other.
Ideally the median value is chosen as the pivot. In the best and average
cases, where the pivot is close to the median, complexity of quicksort
is $O(n \log n)$. In the worst case the complexity is $O(n^2)$.

<div>

[Unstable quicksort implementation]{.label}

```{.text}
quicksort(a[], l, r) {
    if (l < r) {
        p = partition(a[], l, r);
        quicksort(a[], l, p - 1);
        quicksort(a[], p + 1, r);
}
}
partition(a[], l, r) {
    p = choose_pivot(...);
    swap(a[p], a[r]);
    i = l - 1;
    for (j = l; j < r; j ++) {
        if (a[j] < a[r]) {
            swap(a[j], a[++i]);
        }
    }
    swap(a[r], a[i+1]);
    return i + 1;
}
partition(a[], l, r) {
    p = choose_pivot(...);
    swap(a[p], a[r]);
    i = l;
    j = r - 1;
    while (i <= j) {
        while(i <= j && a[i] <= a[r]) i ++;
        while(j >= i && a[j] >= a[r]) j --;
        if (i < j) swap(a[i], a[j]);
    }
    swap(a[r], a[i]);
    return i;
}
```

</div>

The most simple quicksort algorithm is not stable. Quicksort can be made
stable by introducing a buffer to store elements greater than and equal
and occurring to the right of the pivot. Once these elements have been
collected, they are added to the appropriate index of the original
sub-list. Using a buffer introduces $O(n)$ auxiliary space complexity.

<div>

[Stable quicksort implementation using a buffer]{.label}

```{.text}
partition(a[], l, r) { // stable sort
    p = choose_pivot(...);
    pv = a[p];
    n = (r - l) + 1
    new b[n];
    i = l;
    j = 1; // reserve 0 index for pivot
    for ( k = l; k <= r; k++) {
         if (k = p) b[0] = a[k];
         else if (a[k] < pv || (a[k] == pv && k < p)) a[i++] = a[k];
         else b[j++] = a[k];
    }
    for (m = 0; m < j; m++)
        a[i++] = b[m];
    return r - j + 1;
}
```

</div>
