const node = (data) => {
    return {
        data: data,
        right: null,
        left: null,
    };
};

const tree = (arr) => {
    return {
        arr: arr,
        root: null,
        insert(val, currentNode = this.root) {
            if (!currentNode) {
                const newNode = node(val);
                return newNode;
            } else if (val >= currentNode.data) {
                currentNode.right = this.insert(val, currentNode.right);
            } else if (val < currentNode.data) {
                currentNode.left = this.insert(val, currentNode.left);
            }
            return currentNode;
        },
        delete(val, currentNode = this.root) {
            if (!currentNode) {
                return currentNode;
            }
            if (val < currentNode.data) {
                currentNode.left = this.delete(val, currentNode.left);
                return currentNode;
            } else if (val > currentNode.data) {
                currentNode.right = this.delete(val, currentNode.right);
                return currentNode;
            }

            //When currentNode = val
            if (!currentNode.left) {
                const newNode = currentNode.right;
                currentNode = null;
                return newNode;
            } else if (!currentNode.right) {
                const newNode = currentNode.left;
                currentNode = null;
                return newNode;
            } else { // Both children exist
                let oldNode = currentNode;
                let newNode = currentNode.right;
                while (newNode.left) {  //Traverse down the left nodes
                    oldNode = newNode;
                    newNode = newNode.left;
                }

                if (oldNode != currentNode) {
                    oldNode.left = newNode.right;
                } else {
                    oldNode.right = newNode.right;
                }

                currentNode.data = newNode.data;
                newNode = null;
            }
            return currentNode;
        },
        find(val, currentNode = this.root) {
            if (!currentNode) {
                // console.log(val, 'Not Found');
                return null;
            } else if (val === currentNode.data) {
                return currentNode;
            } else if (val > currentNode.data) {
                return this.find(val, currentNode.right);
            } else if (val < currentNode.data) {
                return this.find(val, currentNode.left);
            }
        },
        levelOrder(read, nodeAr = [this.root]) {
            if (nodeAr.length <= 0) {
                return nodeAr;
            } else {
                let currentNode = nodeAr[0];
                console.log(currentNode.data);
                nodeAr = read(currentNode, nodeAr);
                nodeAr.shift();
                return this.levelOrder(read, nodeAr);
            }
        },
        preOrder(read, currentNode = this.root) {
            read(currentNode);
            if (currentNode.left) {
                this.preOrder(read, currentNode.left);
            }
            if (currentNode.right) {
                this.preOrder(read, currentNode.right);
            }
        },
        inOrder(read, currentNode = this.root, nodeAr = []) {
            if (currentNode.left) {
                this.inOrder(read, currentNode.left, nodeAr);
            }
            read(currentNode, nodeAr);
            if (currentNode.right) {
                this.inOrder(read, currentNode.right, nodeAr);
            }
            return nodeAr;
        },
        postOrder(read, currentNode = this.root) {
            if (currentNode.left) {
                this.postOrder(read, currentNode.left);
            }
            if (currentNode.right) {
                this.postOrder(read, currentNode.right);
            }
            read(currentNode);
        },
        getHeight(currentNode, height = 0) {
            if (!currentNode) {
                return height - 1;
            } else {
                height++;
                let rightHeight = this.getHeight(currentNode.right, height);
                let leftHeight = this.getHeight(currentNode.left, height);

                if (rightHeight >= leftHeight) {
                    return rightHeight;
                } else {
                    return leftHeight;
                }
            }
        },
        getDepth(node, currentNode = this.root, depth = 0) {
            if (!node || !currentNode) {
                return null;
            }
            if (node.data === currentNode.data) {
                return depth;
            }
            depth++;
            if (node.data < currentNode.data) {
                return this.getDepth(node, currentNode.left, depth);
            } else if (node.data > currentNode.data) {
                return this.getDepth(node, currentNode.right, depth);
            }
        },
        isBalanced(currentNode = this.root) {
            if (currentNode == null) {
                return true;
            }
            let leftHeight = this.getHeight(currentNode.left);
            let rightHeight = this.getHeight(currentNode.right);

            if (Math.abs(leftHeight - rightHeight) <= 1 &&
                this.isBalanced(currentNode.left) && this.isBalanced(currentNode.right)) {
                return true;
            }
            return false;
        },
        reBalance(read, buildTree) {
            let sortedAr = this.inOrder(read);
            this.root = null;
            let newTree = buildTree(sortedAr);
            this.root = newTree.root;
        },
    };
};

const arrToBST = (arr, start, end) => {
    if (start > end) {
        return null;
    }
    const midIndex = Math.round((start + end) / 2);
    const root = node(arr[midIndex]);
    root.left = arrToBST(arr, start, midIndex - 1);
    root.right = arrToBST(arr, midIndex + 1, end);

    return root;
};

const readLevelOrder = (node, nodeAr) => {
    if (node.left) {
        nodeAr.push(node.left);
    }
    if (node.right) {
        nodeAr.push(node.right);
    }
    return nodeAr;
};

const read = (node) => {
    console.log(node.data);
};

const readToArray = (node, ar) => {
    ar.push(node.data);
};

const buildTree = (sortedArr) => {
    const bstTree = tree(sortedArr);
    const length = sortedArr.length;
    bstTree.root = arrToBST(sortedArr, 0, length - 1);
    return bstTree;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// Sort

const mergeSort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    } else {
        const mid = Math.ceil(arr.length / 2);
        const leftHalf = arr.slice(0, mid);
        const rightHalf = arr.slice(mid);
        const sortedLeft = mergeSort(leftHalf);
        const sortedRight = mergeSort(rightHalf);

        return merge(sortedLeft, sortedRight);
    }
};

const merge = (left, right) => {
    let mergedArr = [];

    let indexLeft = 0;  //First half
    let indexRight = 0; //Second

    while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] <= right[indexRight]) {
            mergedArr.push(left[indexLeft]);
            indexLeft++;
        } else {
            mergedArr.push(right[indexRight]);
            indexRight++;
        }
    }

    while (indexLeft < left.length) {
        mergedArr.push(left[indexLeft]);
        indexLeft++;
    }

    while (indexRight < right.length) {
        mergedArr.push(right[indexRight]);
        indexRight++;
    }
    return mergedArr;
};

const arr = [1, 4, 2, 7, 3, 12, 44, 5];

const sortedAr = mergeSort(arr);

let bstTree = buildTree(sortedAr);

bstTree.insert(40);
bstTree.insert(39);
bstTree.insert(38);

bstTree.delete(3);
console.log(bstTree.find(3));
prettyPrint(bstTree.root);
console.log('Level Order: ');
bstTree.levelOrder(readLevelOrder);
console.log();
console.log('Pre Order: ');
bstTree.preOrder(read);
console.log();
console.log('In Order: ', bstTree.inOrder(readToArray));
console.log();
console.log('Post Order: ');
bstTree.postOrder(read);
console.log('Depth: ', bstTree.getDepth(bstTree.root.left.left.left));
console.log('Height: ', bstTree.getHeight(bstTree.root.right));
console.log('Balanced: ', bstTree.isBalanced());
bstTree.reBalance(readToArray, buildTree);
prettyPrint(bstTree.root);
console.log('reBalanced: ', bstTree.isBalanced());
