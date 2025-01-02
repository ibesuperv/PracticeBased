const codeSnippets = {
    c: {
        stack: `#include <stdio.h>
#include <stdlib.h>

#define MAX 100 // Maximum size of the stack

// Structure to define a stack
typedef struct {
    int arr[MAX];
    int top; // Indicates the top of the stack
} Stack;

// Function to initialize the stack
void initialize(Stack *stack) {
    stack->top = -1; // Stack is empty when top is -1
}

// Function to check if the stack is empty
int isEmpty(Stack *stack) {
    return stack->top == -1;
}

// Function to check if the stack is full
int isFull(Stack *stack) {
    return stack->top == MAX - 1;
}

// Function to push an element onto the stack
void push(Stack *stack, int value) {
    if (isFull(stack)) {
        printf("Stack Overflow! Cannot push %d onto the stack.\n", value);
        return;
    }
    stack->arr[++stack->top] = value; // Increment top and add the value
    printf("Pushed %d onto the stack.\n", value);
}

// Function to pop an element from the stack
int pop(Stack *stack) {
    if (isEmpty(stack)) {
        printf("Stack Underflow! Cannot pop from the stack.\n");
        return -1; // Return -1 to indicate failure
    }
    return stack->arr[stack->top--]; // Return the top value and decrement top
}

// Function to peek (view) the top element of the stack
int peek(Stack *stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty! No top element.\n");
        return -1; // Return -1 to indicate failure
    }
    return stack->arr[stack->top];
}

// Function to display all elements in the stack
void display(Stack *stack) {
    if (isEmpty(stack)) {
        printf("Stack is empty! Nothing to display.\n");
        return;
    }
    printf("Stack elements are:\n");
    for (int i = stack->top; i >= 0; i--) {
        printf("%d\n", stack->arr[i]);
    }
}

// Function to reverse a string using a stack
void reverseString(char *str) {
    Stack stack;
    initialize(&stack);
    int i = 0;

    // Push all characters of the string onto the stack
    while (str[i] != '\0') {
        if (!isFull(&stack)) {
            push(&stack, str[i]);
        }
        i++;
    }

    // Pop all characters and update the string
    i = 0;
    while (!isEmpty(&stack)) {
        str[i++] = pop(&stack);
    }
    str[i] = '\0'; // Null-terminate the reversed string
}

int main() {
    Stack stack;
    initialize(&stack);

    // Basic stack operations
    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);

    printf("Top element is: %d\n", peek(&stack));
    printf("Popped element is: %d\n", pop(&stack));

    display(&stack);

    // Advanced operation: Reverse a string
    char str[] = "Stack Example";
    printf("\nOriginal string: %s\n", str);
    reverseString(str);
    printf("Reversed string: %s\n", str);

    return 0;
}

`,
        queue: `#include <stdio.h>
#include <stdlib.h>

#define MAX 100 // Maximum size of the queue

// Structure to define a queue
typedef struct {
    int arr[MAX];
    int front; // Index of the front element
    int rear;  // Index of the rear element
} Queue;

// Function to initialize the queue
void initialize(Queue *queue) {
    queue->front = -1;
    queue->rear = -1; // Queue is empty when both are -1
}

// Function to check if the queue is empty
int isEmpty(Queue *queue) {
    return queue->front == -1;
}

// Function to check if the queue is full
int isFull(Queue *queue) {
    return (queue->rear + 1) % MAX == queue->front;
}

// Function to enqueue (add) an element to the queue
void enqueue(Queue *queue, int value) {
    if (isFull(queue)) {
        printf("Queue Overflow! Cannot enqueue %d.\n", value);
        return;
    }
    if (isEmpty(queue)) {
        queue->front = queue->rear = 0; // First element added
    } else {
        queue->rear = (queue->rear + 1) % MAX; // Increment rear circularly
    }
    queue->arr[queue->rear] = value;
    printf("Enqueued %d to the queue.\n", value);
}

// Function to dequeue (remove) an element from the queue
int dequeue(Queue *queue) {
    if (isEmpty(queue)) {
        printf("Queue Underflow! Cannot dequeue.\n");
        return -1; // Return -1 to indicate failure
    }
    int value = queue->arr[queue->front];
    if (queue->front == queue->rear) {
        // If only one element was in the queue
        queue->front = queue->rear = -1;
    } else {
        queue->front = (queue->front + 1) % MAX; // Increment front circularly
    }
    printf("Dequeued %d from the queue.\n", value);
    return value;
}

// Function to display all elements in the queue
void display(Queue *queue) {
    if (isEmpty(queue)) {
        printf("Queue is empty! Nothing to display.\n");
        return;
    }
    printf("Queue elements are:\n");
    int i = queue->front;
    do {
        printf("%d ", queue->arr[i]);
        i = (i + 1) % MAX;
    } while (i != (queue->rear + 1) % MAX);
    printf("\n");
}

// Advanced Application: Circular Queue for Message Passing
void circularQueueDemo() {
    printf("\n*** Circular Queue Demo ***\n");
    Queue queue;
    initialize(&queue);

    enqueue(&queue, 10);
    enqueue(&queue, 20);
    enqueue(&queue, 30);

    display(&queue);

    dequeue(&queue);
    dequeue(&queue);

    enqueue(&queue, 40);
    enqueue(&queue, 50);

    display(&queue);
}

// Advanced Application: Reverse First K Elements of a Queue
void reverseFirstKElements(Queue *queue, int k) {
    if (k > MAX || k > (queue->rear - queue->front + 1)) {
        printf("Invalid value for k. Cannot reverse.\n");
        return;
    }

    int stack[MAX];
    int top = -1;

    // Push first k elements into a stack
    for (int i = 0; i < k; i++) {
        stack[++top] = dequeue(queue);
    }

    // Pop from the stack and enqueue back
    while (top != -1) {
        enqueue(queue, stack[top--]);
    }

    // Enqueue the remaining elements to maintain order
    int size = queue->rear - queue->front + 1;
    for (int i = 0; i < size - k; i++) {
        enqueue(queue, dequeue(queue));
    }
}

int main() {
    Queue queue;
    initialize(&queue);

    // Basic queue operations
    enqueue(&queue, 10);
    enqueue(&queue, 20);
    enqueue(&queue, 30);

    printf("Dequeued element: %d\n", dequeue(&queue));
    display(&queue);

    // Advanced operation: Circular queue
    circularQueueDemo();

    // Advanced application: Reverse first K elements
    enqueue(&queue, 1);
    enqueue(&queue, 2);
    enqueue(&queue, 3);
    enqueue(&queue, 4);
    enqueue(&queue, 5);

    printf("\nOriginal queue:\n");
    display(&queue);

    int k = 3;
    printf("\nReversing the first %d elements of the queue...\n", k);
    reverseFirstKElements(&queue, k);

    printf("Queue after reversing first %d elements:\n", k);
    display(&queue);

    return 0;
}
`,
        linkedlist: `#include <stdio.h>
#include <stdlib.h>

// Definition of a Node
typedef struct Node {
    int data;
    struct Node *next;
} Node;

// Function to create a new node
Node* createNode(int data) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// Insert a node at the beginning of the linked list
void insertAtBeginning(Node **head, int data) {
    Node *newNode = createNode(data);
    newNode->next = *head;
    *head = newNode;
    printf("Inserted %d at the beginning.\n", data);
}

// Insert a node at the end of the linked list
void insertAtEnd(Node **head, int data) {
    Node *newNode = createNode(data);
    if (*head == NULL) {
        *head = newNode;
        printf("Inserted %d at the end (first node).\n", data);
        return;
    }
    Node *temp = *head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = newNode;
    printf("Inserted %d at the end.\n", data);
}

// Insert a node at a specific position
void insertAtPosition(Node **head, int data, int position) {
    Node *newNode = createNode(data);
    if (position == 1) {
        newNode->next = *head;
        *head = newNode;
        printf("Inserted %d at position %d.\n", data, position);
        return;
    }
    Node *temp = *head;
    for (int i = 1; i < position - 1 && temp != NULL; i++) {
        temp = temp->next;
    }
    if (temp == NULL) {
        printf("Position out of range.\n");
        free(newNode);
        return;
    }
    newNode->next = temp->next;
    temp->next = newNode;
    printf("Inserted %d at position %d.\n", data, position);
}

// Delete a node from the beginning of the linked list
void deleteFromBeginning(Node **head) {
    if (*head == NULL) {
        printf("List is empty. Cannot delete.\n");
        return;
    }
    Node *temp = *head;
    *head = (*head)->next;
    printf("Deleted %d from the beginning.\n", temp->data);
    free(temp);
}

// Delete a node from the end of the linked list
void deleteFromEnd(Node **head) {
    if (*head == NULL) {
        printf("List is empty. Cannot delete.\n");
        return;
    }
    Node *temp = *head;
    if (temp->next == NULL) {
        printf("Deleted %d from the end (last node).\n", temp->data);
        free(temp);
        *head = NULL;
        return;
    }
    while (temp->next->next != NULL) {
        temp = temp->next;
    }
    printf("Deleted %d from the end.\n", temp->next->data);
    free(temp->next);
    temp->next = NULL;
}

// Reverse the linked list
void reverseLinkedList(Node **head) {
    Node *prev = NULL, *current = *head, *next = NULL;
    while (current != NULL) {
        next = current->next;  // Store the next node
        current->next = prev;  // Reverse the current node's link
        prev = current;        // Move prev forward
        current = next;        // Move current forward
    }
    *head = prev;
    printf("Reversed the linked list.\n");
}

// Find the middle node of the linked list
void findMiddleNode(Node *head) {
    if (head == NULL) {
        printf("List is empty.\n");
        return;
    }
    Node *slow = head, *fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;  // Move slow by 1
        fast = fast->next->next;  // Move fast by 2
    }
    printf("The middle node is: %d\n", slow->data);
}

// Merge two sorted linked lists
Node* mergeSortedLists(Node *list1, Node *list2) {
    if (list1 == NULL) return list2;
    if (list2 == NULL) return list1;

    Node *mergedHead = NULL;
    if (list1->data < list2->data) {
        mergedHead = list1;
        mergedHead->next = mergeSortedLists(list1->next, list2);
    } else {
        mergedHead = list2;
        mergedHead->next = mergeSortedLists(list1, list2->next);
    }
    return mergedHead;
}

// Display the linked list
void displayList(Node *head) {
    if (head == NULL) {
        printf("List is empty.\n");
        return;
    }
    Node *temp = head;
    printf("Linked List: ");
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\n");
}

// Main function to demonstrate operations
int main() {
    Node *list1 = NULL;
    Node *list2 = NULL;

    // Inserting into list1
    insertAtEnd(&list1, 10);
    insertAtEnd(&list1, 20);
    insertAtEnd(&list1, 30);
    displayList(list1);

    // Inserting into list2
    insertAtEnd(&list2, 5);
    insertAtEnd(&list2, 15);
    insertAtEnd(&list2, 25);
    displayList(list2);

    // Merging sorted lists
    Node *mergedList = mergeSortedLists(list1, list2);
    printf("Merged Sorted List:\n");
    displayList(mergedList);

    // Find middle node
    findMiddleNode(mergedList);

    // Reverse the merged list
    reverseLinkedList(&mergedList);
    printf("Reversed Merged List:\n");
    displayList(mergedList);

    // Delete from beginning and end
    deleteFromBeginning(&mergedList);
    deleteFromEnd(&mergedList);
    displayList(mergedList);

    return 0;
}
`,
        tree: `#include <stdio.h>
#include <stdlib.h>

// Define a structure for tree nodes
typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;

// Function to create a new node
Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// Function to insert a node in a Binary Search Tree (BST)
Node* insert(Node* root, int data) {
    if (root == NULL) {
        return createNode(data); // Create a new node if tree is empty
    }
    if (data < root->data) {
        root->left = insert(root->left, data); // Insert in the left subtree
    } else {
        root->right = insert(root->right, data); // Insert in the right subtree
    }
    return root; // Return the root node after insertion
}

// Function to search for a node in BST
Node* search(Node* root, int key) {
    if (root == NULL || root->data == key) {
        return root; // Return the node if found or NULL if not found
    }
    if (key < root->data) {
        return search(root->left, key); // Search in the left subtree
    }
    return search(root->right, key); // Search in the right subtree
}

// Function to find the minimum value in BST
Node* findMin(Node* root) {
    while (root && root->left != NULL) {
        root = root->left; // Move to the leftmost node
    }
    return root;
}

// Function to find the maximum value in BST
Node* findMax(Node* root) {
    while (root && root->right != NULL) {
        root = root->right; // Move to the rightmost node
    }
    return root;
}

// Function to perform in-order traversal
void inOrderTraversal(Node* root) {
    if (root != NULL) {
        inOrderTraversal(root->left);   // Visit left subtree
        printf("%d ", root->data);      // Visit root
        inOrderTraversal(root->right); // Visit right subtree
    }
}

// Function to delete a node in BST
Node* deleteNode(Node* root, int key) {
    if (root == NULL) {
        return root; // Return NULL if tree is empty
    }
    if (key < root->data) {
        root->left = deleteNode(root->left, key); // Delete in left subtree
    } else if (key > root->data) {
        root->right = deleteNode(root->right, key); // Delete in right subtree
    } else {
        // Node with only one child or no child
        if (root->left == NULL) {
            Node* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            Node* temp = root->left;
            free(root);
            return temp;
        }

        // Node with two children: Get the in-order successor
        Node* temp = findMin(root->right);
        root->data = temp->data; // Copy successor's value to current node
        root->right = deleteNode(root->right, temp->data); // Delete successor
    }
    return root;
}

// Main function
int main() {
    Node* root = NULL;

    // Insert nodes into the BST
    root = insert(root, 50);
    root = insert(root, 30);
    root = insert(root, 70);
    root = insert(root, 20);
    root = insert(root, 40);
    root = insert(root, 60);
    root = insert(root, 80);

    printf("In-order Traversal of the BST: ");
    inOrderTraversal(root);
    printf("\n");

    // Search for a node
    int key = 40;
    Node* searchResult = search(root, key);
    if (searchResult != NULL) {
        printf("Node %d found in the BST.\n", key);
    } else {
        printf("Node %d not found in the BST.\n", key);
    }

    // Find the minimum and maximum values
    Node* minNode = findMin(root);
    Node* maxNode = findMax(root);
    printf("Minimum value in the BST: %d\n", minNode->data);
    printf("Maximum value in the BST: %d\n", maxNode->data);

    // Delete a node
    root = deleteNode(root, 50);
    printf("In-order Traversal after deleting 50: ");
    inOrderTraversal(root);
    printf("\n");

    return 0;
}
`
    },
    cpp: {
        stack: `#include <iostream>
using namespace std;

class Stack {
private:
    int* stack;     // Pointer to hold stack elements
    int top;        // Points to the top element of the stack
    int capacity;   // Maximum capacity of the stack

public:
    // Constructor to initialize the stack
    Stack(int capacity) {
        this->capacity = capacity;
        stack = new int[capacity]; // Dynamically allocated array for stack
        top = -1; // Stack is initially empty
    }

    // Destructor to free allocated memory
    ~Stack() {
        delete[] stack;
    }

    // Check if the stack is full
    bool isFull() {
        return top == capacity - 1;
    }

    // Check if the stack is empty
    bool isEmpty() {
        return top == -1;
    }

    // Push operation to add an element to the stack
    void push(int data) {
        if (isFull()) {
            cout << "Stack is full. Cannot push " << data << endl;
            return;
        }
        stack[++top] = data; // Increment top and add the element
        cout << "Pushed: " << data << endl;
    }

    // Pop operation to remove the top element from the stack
    int pop() {
        if (isEmpty()) {
            cout << "Stack is empty. Cannot pop." << endl;
            return -1;
        }
        int data = stack[top--]; // Return the top element and decrement top
        cout << "Popped: " << data << endl;
        return data;
    }

    // Peek operation to view the top element
    int peek() {
        if (isEmpty()) {
            cout << "Stack is empty. Nothing to peek." << endl;
            return -1;
        }
        return stack[top];
    }

    // Size operation to return the current size of the stack
    int size() {
        return top + 1;
    }

    // Clear operation to remove all elements from the stack
    void clear() {
        top = -1;
        cout << "Stack cleared." << endl;
    }

    // Search operation to find the position of an element in the stack
    int search(int element) {
        for (int i = 0; i <= top; i++) {
            if (stack[i] == element) {
                return top - i + 1; // Return position from the top
            }
        }
        return -1; // Element not found
    }

    // Reverse the stack
    void reverse() {
        if (isEmpty()) {
            cout << "Stack is empty. Nothing to reverse." << endl;
            return;
        }
        for (int i = 0; i < top / 2; i++) {
            // Swap the elements
            int temp = stack[i];
            stack[i] = stack[top - i];
            stack[top - i] = temp;
        }
        cout << "Stack reversed." << endl;
    }

    // Copy the stack
    void copy() {
        if (isEmpty()) {
            cout << "Stack is empty. Cannot copy." << endl;
            return;
        }
        Stack copiedStack(capacity);
        for (int i = 0; i <= top; i++) {
            copiedStack.push(stack[i]); // Push elements into the copied stack
        }
        cout << "Stack copied." << endl;
        copiedStack.display(); // Display copied stack
    }

    // Display all elements in the stack
    void display() {
        if (isEmpty()) {
            cout << "Stack is empty." << endl;
            return;
        }
        cout << "Stack: ";
        for (int i = 0; i <= top; i++) {
            cout << stack[i] << " ";
        }
        cout << endl;
    }
};

// Main function to demonstrate stack operations
int main() {
    Stack stack(10);

    // Push elements
    stack.push(10);
    stack.push(20);
    stack.push(30);
    stack.push(40);
    stack.push(50);

    // Display the stack
    stack.display();

    // Size of the stack
    cout << "Stack size: " << stack.size() << endl;

    // Search for an element in the stack
    cout << "Position of element 30 from top: " << stack.search(30) << endl;
    cout << "Position of element 60 from top: " << stack.search(60) << endl;

    // Peek at the top element
    cout << "Top element: " << stack.peek() << endl;

    // Pop elements
    stack.pop();
    stack.pop();

    // Display the stack after pop operations
    stack.display();

    // Reverse the stack
    stack.reverse();

    // Display the stack after reversal
    stack.display();

    // Copy the stack
    stack.copy();

    // Clear the stack
    stack.clear();
    stack.display();

    return 0;
}
`,
        queue: `#include <iostream>
using namespace std;

class Queue {
private:
    int* queue;      // Pointer to hold queue elements
    int front, rear; // Front and rear indices of the queue
    int capacity;    // Maximum capacity of the queue
    int currentSize; // Current number of elements in the queue

public:
    // Constructor to initialize the queue
    Queue(int capacity) {
        this->capacity = capacity;
        queue = new int[capacity]; // Dynamically allocated array for queue
        front = 0;
        rear = -1;
        currentSize = 0;
    }

    // Destructor to free allocated memory
    ~Queue() {
        delete[] queue;
    }

    // Check if the queue is full
    bool isFull() {
        return currentSize == capacity;
    }

    // Check if the queue is empty
    bool isEmpty() {
        return currentSize == 0;
    }

    // Enqueue operation to add an element to the queue
    void enqueue(int data) {
        if (isFull()) {
            cout << "Queue is full. Cannot enqueue " << data << endl;
            return;
        }
        rear = (rear + 1) % capacity; // Circular increment for rear
        queue[rear] = data;           // Add the element
        currentSize++;
        cout << "Enqueued: " << data << endl;
    }

    // Dequeue operation to remove the front element from the queue
    int dequeue() {
        if (isEmpty()) {
            cout << "Queue is empty. Cannot dequeue." << endl;
            return -1;
        }
        int data = queue[front];         // Store front element
        front = (front + 1) % capacity;  // Circular increment for front
        currentSize--;
        cout << "Dequeued: " << data << endl;
        return data;
    }

    // Peek operation to view the front element
    int peek() {
        if (isEmpty()) {
            cout << "Queue is empty. Nothing to peek." << endl;
            return -1;
        }
        return queue[front];
    }

    // Size operation to return the current size of the queue
    int size() {
        return currentSize;
    }

    // Clear operation to remove all elements from the queue
    void clear() {
        front = 0;
        rear = -1;
        currentSize = 0;
        cout << "Queue cleared." << endl;
    }

    // Reverse the queue
    void reverse() {
        if (isEmpty()) {
            cout << "Queue is empty. Nothing to reverse." << endl;
            return;
        }
        int start = front;
        int end = rear;
        while (start != end) {
            // Swap elements at start and end
            swap(queue[start], queue[end]);
            start = (start + 1) % capacity;
            end = (end - 1 + capacity) % capacity;
        }
        cout << "Queue reversed." << endl;
    }

    // Copy the queue
    void copy() {
        if (isEmpty()) {
            cout << "Queue is empty. Cannot copy." << endl;
            return;
        }
        Queue copiedQueue(capacity); // Create a new queue
        for (int i = 0; i < currentSize; i++) {
            copiedQueue.enqueue(queue[(front + i) % capacity]); // Enqueue elements into the copied queue
        }
        cout << "Queue copied." << endl;
        copiedQueue.display(); // Display the copied queue
    }

    // Display all elements in the queue
    void display() {
        if (isEmpty()) {
            cout << "Queue is empty." << endl;
            return;
        }
        cout << "Queue: ";
        for (int i = 0; i < currentSize; i++) {
            cout << queue[(front + i) % capacity] << " "; // Circular indexing
        }
        cout << endl;
    }
};

// Main function to demonstrate queue operations
int main() {
    Queue q(10);

    // Enqueue elements
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    q.enqueue(40);
    q.enqueue(50);

    // Display the queue
    q.display();

    // Size of the queue
    cout << "Queue size: " << q.size() << endl;

    // Peek at the front element
    cout << "Front element: " << q.peek() << endl;

    // Dequeue elements
    q.dequeue();
    q.dequeue();

    // Display the queue after dequeue operations
    q.display();

    // Reverse the queue
    q.reverse();

    // Display the queue after reversal
    q.display();

    // Copy the queue
    q.copy();

    // Clear the queue
    q.clear();
    q.display();

    return 0;
}
`,
        linkedlist: `#include <iostream>
using namespace std;

// Define a Node structure
struct Node {
    int data;
    Node* next;
    
    // Constructor to create a new node
    Node(int data) {
        this->data = data;
        this->next = nullptr;
    }
};

class LinkedList {
private:
    Node* head; // Pointer to the head of the list
    int listSize; // Size of the list

public:
    // Constructor to initialize the LinkedList
    LinkedList() {
        head = nullptr;
        listSize = 0;
    }

    // Destructor to free the memory
    ~LinkedList() {
        clear();
    }

    // Insert a node at the end of the list
    void insert(int data) {
        Node* newNode = new Node(data);
        if (!head) {
            head = newNode;
        } else {
            Node* temp = head;
            while (temp->next) {
                temp = temp->next;
            }
            temp->next = newNode;
        }
        listSize++;
        cout << "Inserted: " << data << endl;
    }

    // Delete a node with a specific value
    void deleteValue(int value) {
        if (!head) {
            cout << "List is empty. Cannot delete." << endl;
            return;
        }

        // If the node to be deleted is the head
        if (head->data == value) {
            Node* temp = head;
            head = head->next;
            delete temp;
            listSize--;
            cout << "Deleted: " << value << endl;
            return;
        }

        Node* temp = head;
        Node* prev = nullptr;
        while (temp && temp->data != value) {
            prev = temp;
            temp = temp->next;
        }

        if (temp) {
            prev->next = temp->next;
            delete temp;
            listSize--;
            cout << "Deleted: " << value << endl;
        } else {
            cout << "Value " << value << " not found." << endl;
        }
    }

    // Search for a node with a specific value
    bool search(int value) {
        Node* temp = head;
        while (temp) {
            if (temp->data == value) {
                return true;
            }
            temp = temp->next;
        }
        return false;
    }

    // Display the entire linked list
    void display() {
        if (!head) {
            cout << "List is empty." << endl;
            return;
        }
        Node* temp = head;
        cout << "Linked List: ";
        while (temp) {
            cout << temp->data << " ";
            temp = temp->next;
        }
        cout << endl;
    }

    // Reverse the linked list
    void reverse() {
        Node* prev = nullptr;
        Node* current = head;
        Node* next = nullptr;
        while (current) {
            next = current->next;  // Store the next node
            current->next = prev;  // Reverse the current node's pointer
            prev = current;        // Move the prev and current one step forward
            current = next;
        }
        head = prev;  // Update head to the new first node
        cout << "List reversed." << endl;
    }

    // Get the size of the list
    int size() {
        return listSize;
    }

    // Clear the entire list
    void clear() {
        while (head) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
        listSize = 0;
        cout << "List cleared." << endl;
    }

    // Copy the list
    LinkedList copy() {
        LinkedList newList;
        Node* temp = head;
        while (temp) {
            newList.insert(temp->data);
            temp = temp->next;
        }
        return newList;
    }
};

// Main function to demonstrate linked list operations
int main() {
    LinkedList list;

    // Insert elements into the linked list
    list.insert(10);
    list.insert(20);
    list.insert(30);
    list.insert(40);
    list.insert(50);

    // Display the linked list
    list.display();

    // Search for an element in the list
    if (list.search(30)) {
        cout << "Element 30 found in the list." << endl;
    } else {
        cout << "Element 30 not found in the list." << endl;
    }

    // Delete an element from the list
    list.deleteValue(30);
    list.display();

    // Reverse the linked list
    list.reverse();
    list.display();

    // Copy the linked list
    LinkedList copiedList = list.copy();
    copiedList.display();

    // Display the size of the list
    cout << "Size of the list: " << list.size() << endl;

    // Clear the list
    list.clear();
    list.display();

    return 0;
}
`,
        tree: `#include <iostream>
#include <queue>
using namespace std;

// Node structure for BT
struct Node {
    int data;
    Node* left;
    Node* right;
    
    // Constructor to create a new node
    Node(int data) {
        this->data = data;
        this->left = nullptr;
        this->right = nullptr;
    }
};

class BinarySearchTree {
private:
    Node* root;

    // Helper function for in-order traversal
    void inorderHelper(Node* node) {
        if (node == nullptr) return;
        inorderHelper(node->left);
        cout << node->data << " ";
        inorderHelper(node->right);
    }

    // Helper function for pre-order traversal
    void preorderHelper(Node* node) {
        if (node == nullptr) return;
        cout << node->data << " ";
        preorderHelper(node->left);
        preorderHelper(node->right);
    }

    // Helper function for post-order traversal
    void postorderHelper(Node* node) {
        if (node == nullptr) return;
        postorderHelper(node->left);
        postorderHelper(node->right);
        cout << node->data << " ";
    }

    // Helper function to find minimum node
    Node* findMin(Node* node) {
        while (node && node->left) {
            node = node->left;
        }
        return node;
    }

    // Helper function to delete a node
    Node* deleteNodeHelper(Node* node, int value) {
        if (node == nullptr) return node;

        if (value < node->data) {
            node->left = deleteNodeHelper(node->left, value);
        } else if (value > node->data) {
            node->right = deleteNodeHelper(node->right, value);
        } else {
            // Node with only one child or no child
            if (node->left == nullptr) {
                Node* temp = node->right;
                delete node;
                return temp;
            } else if (node->right == nullptr) {
                Node* temp = node->left;
                delete node;
                return temp;
            }

            // Node with two children: Get the inorder successor (smallest in the right subtree)
            Node* temp = findMin(node->right);
            node->data = temp->data;
            node->right = deleteNodeHelper(node->right, temp->data);
        }
        return node;
    }

public:
    // Constructor to initialize the tree
    BinarySearchTree() {
        root = nullptr;
    }

    // Insert a new value in the tree
    void insert(int value) {
        Node* newNode = new Node(value);
        if (root == nullptr) {
            root = newNode;
        } else {
            Node* temp = root;
            while (true) {
                if (value < temp->data) {
                    if (temp->left == nullptr) {
                        temp->left = newNode;
                        break;
                    } else {
                        temp = temp->left;
                    }
                } else if (value > temp->data) {
                    if (temp->right == nullptr) {
                        temp->right = newNode;
                        break;
                    } else {
                        temp = temp->right;
                    }
                }
            }
        }
        cout << "Inserted: " << value << endl;
    }

    // Delete a value from the tree
    void deleteValue(int value) {
        root = deleteNodeHelper(root, value);
        cout << "Deleted: " << value << endl;
    }

    // Search for a value in the tree
    bool search(int value) {
        Node* temp = root;
        while (temp != nullptr) {
            if (temp->data == value) return true;
            if (value < temp->data) temp = temp->left;
            else temp = temp->right;
        }
        return false;
    }

    // In-order traversal
    void inorder() {
        inorderHelper(root);
        cout << endl;
    }

    // Pre-order traversal
    void preorder() {
        preorderHelper(root);
        cout << endl;
    }

    // Post-order traversal
    void postorder() {
        postorderHelper(root);
        cout << endl;
    }

    // Level-order traversal (BFS)
    void levelOrder() {
        if (root == nullptr) return;
        queue<Node*> q;
        q.push(root);
        while (!q.empty()) {
            Node* node = q.front();
            q.pop();
            cout << node->data << " ";
            if (node->left != nullptr) q.push(node->left);
            if (node->right != nullptr) q.push(node->right);
        }
        cout << endl;
    }

    // Get the height of the tree
    int height(Node* node) {
        if (node == nullptr) return 0;
        return max(height(node->left), height(node->right)) + 1;
    }

    // Get the height of the tree
    int height() {
        return height(root);
    }

    // Get the size of the tree (number of nodes)
    int size(Node* node) {
        if (node == nullptr) return 0;
        return size(node->left) + size(node->right) + 1;
    }

    // Get the size of the tree
    int size() {
        return size(root);
    }

    // Clear the tree (delete all nodes)
    void clear() {
        while (root != nullptr) {
            root = deleteNodeHelper(root, root->data);
        }
        cout << "Tree cleared." << endl;
    }

    // Destructor to free memory
    ~BinarySearchTree() {
        clear();
    }
};

// Main function to demonstrate BST operations
int main() {
    BinarySearchTree bst;

    // Insert elements into the BST
    bst.insert(50);
    bst.insert(30);
    bst.insert(20);
    bst.insert(40);
    bst.insert(70);
    bst.insert(60);
    bst.insert(80);

    // Display the tree (in-order, pre-order, post-order)
    cout << "In-order Traversal: ";
    bst.inorder();
    
    cout << "Pre-order Traversal: ";
    bst.preorder();
    
    cout << "Post-order Traversal: ";
    bst.postorder();
    
    cout << "Level-order Traversal: ";
    bst.levelOrder();

    // Search for a value
    if (bst.search(30)) {
        cout << "Element 30 found in the tree." << endl;
    } else {
        cout << "Element 30 not found in the tree." << endl;
    }

    // Delete a value
    bst.deleteValue(30);
    bst.inorder();

    // Display tree height and size
    cout << "Height of the tree: " << bst.height() << endl;
    cout << "Size of the tree: " << bst.size() << endl;

    // Clear the tree
    bst.clear();
    bst.inorder();

    return 0;
}
`
    },
    java: {
        stack: `import java.util.Stack;
import java.util.Collections;

class AdvancedStack {
    private int[] stack;  // Array to hold stack elements
    private int top;      // Points to the top element of the stack
    private int capacity; // Maximum capacity of the stack

    // Constructor to initialize the stack
    public AdvancedStack(int capacity) {
        this.capacity = capacity;
        stack = new int[capacity];
        top = -1; // Stack is initially empty
    }

    // Check if the stack is full
    public boolean isFull() {
        return top == capacity - 1;
    }

    // Check if the stack is empty
    public boolean isEmpty() {
        return top == -1;
    }

    // Push operation to add an element to the stack
    public void push(int data) {
        if (isFull()) {
            System.out.println("Stack is full. Cannot push " + data);
            return;
        }
        stack[++top] = data; // Increment top and add the element
        System.out.println("Pushed: " + data);
    }

    // Pop operation to remove the top element from the stack
    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack is empty. Cannot pop.");
            return -1;
        }
        int data = stack[top--]; // Return the top element and decrement top
        System.out.println("Popped: " + data);
        return data;
    }

    // Peek operation to view the top element
    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is empty. Nothing to peek.");
            return -1;
        }
        return stack[top];
    }

    // Size operation to return the current size of the stack
    public int size() {
        return top + 1;
    }

    // Clear operation to remove all elements from the stack
    public void clear() {
        top = -1;
        System.out.println("Stack cleared.");
    }

    // Search operation to find the position of an element in the stack
    public int search(int element) {
        for (int i = 0; i <= top; i++) {
            if (stack[i] == element) {
                return top - i + 1; // Return position from the top
            }
        }
        return -1; // Element not found
    }

    // Reverse the stack
    public void reverse() {
        if (isEmpty()) {
            System.out.println("Stack is empty. Nothing to reverse.");
            return;
        }
        for (int i = 0; i < top / 2; i++) {
            // Swap the elements
            int temp = stack[i];
            stack[i] = stack[top - i];
            stack[top - i] = temp;
        }
        System.out.println("Stack reversed.");
    }

    // Copy the stack
    public void copy() {
        if (isEmpty()) {
            System.out.println("Stack is empty. Cannot copy.");
            return;
        }
        AdvancedStack copiedStack = new AdvancedStack(capacity);
        for (int i = 0; i <= top; i++) {
            copiedStack.push(stack[i]); // Push elements into the copied stack
        }
        System.out.println("Stack copied.");
        copiedStack.display(); // Display copied stack
    }

    // Display all elements in the stack
    public void display() {
        if (isEmpty()) {
            System.out.println("Stack is empty.");
            return;
        }
        System.out.print("Stack: ");
        for (int i = 0; i <= top; i++) {
            System.out.print(stack[i] + " ");
        }
        System.out.println();
    }

    // Main function to demonstrate stack operations
    public static void main(String[] args) {
        AdvancedStack stack = new AdvancedStack(10);

        // Push elements
        stack.push(10);
        stack.push(20);
        stack.push(30);
        stack.push(40);
        stack.push(50);

        // Display the stack
        stack.display();

        // Size of the stack
        System.out.println("Stack size: " + stack.size());

        // Search for an element in the stack
        System.out.println("Position of element 30 from top: " + stack.search(30));
        System.out.println("Position of element 60 from top: " + stack.search(60));

        // Peek at the top element
        System.out.println("Top element: " + stack.peek());

        // Pop elements
        stack.pop();
        stack.pop();

        // Display the stack after pop operations
        stack.display();

        // Reverse the stack
        stack.reverse();

        // Display the stack after reversal
        stack.display();

        // Copy the stack
        stack.copy();

        // Clear the stack
        stack.clear();
        stack.display();
    }
}
`,
        queue: `class Queue {
    private int[] queue; // Array to store queue elements
    private int front;   // Points to the front element
    private int rear;    // Points to the rear element
    private int size;    // Current size of the queue
    private int capacity; // Maximum capacity of the queue

    // Constructor to initialize the queue
    public Queue(int capacity) {
        this.capacity = capacity;
        queue = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }

    // Check if the queue is full
    public boolean isFull() {
        return size == capacity;
    }

    // Check if the queue is empty
    public boolean isEmpty() {
        return size == 0;
    }

    // Enqueue operation to add an element
    public void enqueue(int data) {
        if (isFull()) {
            System.out.println("Queue is full. Cannot enqueue " + data);
            return;
        }
        rear = (rear + 1) % capacity; // Wrap around using modulo
        queue[rear] = data;
        size++;
        System.out.println("Enqueued: " + data);
    }

    // Dequeue operation to remove an element
    public int dequeue() {
        if (isEmpty()) {
            System.out.println("Queue is empty. Cannot dequeue.");
            return -1;
        }
        int data = queue[front];
        front = (front + 1) % capacity; // Wrap around using modulo
        size--;
        System.out.println("Dequeued: " + data);
        return data;
    }

    // Peek operation to view the front element
    public int peek() {
        if (isEmpty()) {
            System.out.println("Queue is empty. Nothing to peek.");
            return -1;
        }
        return queue[front];
    }

    // Display all elements in the queue
    public void display() {
        if (isEmpty()) {
            System.out.println("Queue is empty.");
            return;
        }
        System.out.print("Queue: ");
        for (int i = 0; i < size; i++) {
            System.out.print(queue[(front + i) % capacity] + " ");
        }
        System.out.println();
    }

    // Main function to demonstrate queue operations
    public static void main(String[] args) {
        Queue queue = new Queue(5);

        // Enqueue elements
        queue.enqueue(10);
        queue.enqueue(20);
        queue.enqueue(30);
        queue.enqueue(40);
        queue.enqueue(50);

        // Display the queue
        queue.display();

        // Try to enqueue when full
        queue.enqueue(60);

        // Peek at the front element
        System.out.println("Front element: " + queue.peek());

        // Dequeue elements
        queue.dequeue();
        queue.dequeue();

        // Display the queue after dequeue operations
        queue.display();

        // Enqueue additional elements
        queue.enqueue(60);
        queue.enqueue(70);

        // Display the queue after more enqueue operations
        queue.display();

        // Peek at the front element again
        System.out.println("Front element: " + queue.peek());
    }
}
`,
        linkedlist: `class LinkedList {
    // Node class for LinkedList
    static class Node {
        int data;
        Node next;

        // Constructor to initialize node
        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    private Node head; // Head of the linked list

    // Insert a node at the beginning
    public void insertAtBeginning(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }

    // Insert a node at the end
    public void insertAtEnd(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    // Insert a node at a specific position
    public void insertAtPosition(int position, int data) {
        if (position < 0) {
            System.out.println("Invalid position!");
            return;
        }
        if (position == 0) {
            insertAtBeginning(data);
            return;
        }
        Node newNode = new Node(data);
        Node temp = head;
        for (int i = 1; i < position && temp != null; i++) {
            temp = temp.next;
        }
        if (temp == null) {
            System.out.println("Position out of bounds!");
            return;
        }
        newNode.next = temp.next;
        temp.next = newNode;
    }

    // Delete a node by value
    public void deleteByValue(int value) {
        if (head == null) {
            System.out.println("List is empty!");
            return;
        }
        if (head.data == value) {
            head = head.next;
            return;
        }
        Node temp = head;
        while (temp.next != null && temp.next.data != value) {
            temp = temp.next;
        }
        if (temp.next == null) {
            System.out.println("Value not found in the list!");
            return;
        }
        temp.next = temp.next.next;
    }

    // Delete a node at a specific position
    public void deleteAtPosition(int position) {
        if (head == null || position < 0) {
            System.out.println("Invalid position!");
            return;
        }
        if (position == 0) {
            head = head.next;
            return;
        }
        Node temp = head;
        for (int i = 1; i < position && temp.next != null; i++) {
            temp = temp.next;
        }
        if (temp.next == null) {
            System.out.println("Position out of bounds!");
            return;
        }
        temp.next = temp.next.next;
    }

    // Search for a value in the linked list
    public boolean search(int value) {
        Node temp = head;
        while (temp != null) {
            if (temp.data == value) {
                return true;
            }
            temp = temp.next;
        }
        return false;
    }

    // Traverse and print the linked list
    public void traverse() {
        if (head == null) {
            System.out.println("List is empty!");
            return;
        }
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " -> ");
            temp = temp.next;
        }
        System.out.println("null");
    }

    // Reverse the linked list
    public void reverse() {
        Node prev = null;
        Node current = head;
        Node next;
        while (current != null) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }

    // Main function to demonstrate the operations
    public static void main(String[] args) {
        LinkedList list = new LinkedList();

        // Insert operations
        list.insertAtEnd(10);
        list.insertAtEnd(20);
        list.insertAtEnd(30);
        list.insertAtBeginning(5);
        list.insertAtPosition(2, 15);

        System.out.println("List after insertions:");
        list.traverse();

        // Search operation
        System.out.println("Is 20 in the list? " + list.search(20));

        // Delete operations
        list.deleteByValue(20);
        System.out.println("List after deleting 20:");
        list.traverse();

        list.deleteAtPosition(1);
        System.out.println("List after deleting node at position 1:");
        list.traverse();

        // Reverse the list
        list.reverse();
        System.out.println("List after reversing:");
        list.traverse();
    }
}
`,
        tree: `public class ArrayBinaryTree {
    private int[] tree; // Array to store tree nodes
    private int capacity; // Maximum size of the tree
    private int size; // Current number of nodes in the tree

    // Constructor to initialize the tree
    public ArrayBinaryTree(int capacity) {
        this.capacity = capacity;
        this.tree = new int[capacity];
        this.size = 0;

        // Initialize all elements with a default value (e.g., -1)
        for (int i = 0; i < capacity; i++) {
            tree[i] = -1;
        }
    }

    // Function to insert a node
    public void insert(int value) {
        if (size == capacity) {
            System.out.println("Tree is full!");
            return;
        }
        tree[size++] = value; // Insert at the next available position
    }

    // Function to search for a value in the tree
    public boolean search(int value) {
        for (int i = 0; i < size; i++) {
            if (tree[i] == value) {
                return true;
            }
        }
        return false;
    }

    // Function to find the minimum value in the tree
    public int findMin() {
        if (size == 0) {
            System.out.println("Tree is empty!");
            return -1;
        }
        int min = Integer.MAX_VALUE;
        for (int i = 0; i < size; i++) {
            if (tree[i] != -1 && tree[i] < min) {
                min = tree[i];
            }
        }
        return min;
    }

    // Function to find the maximum value in the tree
    public int findMax() {
        if (size == 0) {
            System.out.println("Tree is empty!");
            return -1;
        }
        int max = Integer.MIN_VALUE;
        for (int i = 0; i < size; i++) {
            if (tree[i] != -1 && tree[i] > max) {
                max = tree[i];
            }
        }
        return max;
    }

    // Function to delete a node
    public void delete(int value) {
        boolean found = false;
        for (int i = 0; i < size; i++) {
            if (tree[i] == value) {
                tree[i] = -1; // Mark as deleted
                found = true;
                break;
            }
        }
        if (!found) {
            System.out.println("Value not found in the tree.");
        }
    }

    // Function for in-order traversal
    public void inOrderTraversal(int index) {
        if (index >= size || tree[index] == -1) {
            return;
        }
        // Visit left child: left child index is 2 * index + 1
        inOrderTraversal(2 * index + 1);

        // Visit root
        System.out.print(tree[index] + " ");

        // Visit right child: right child index is 2 * index + 2
        inOrderTraversal(2 * index + 2);
    }

    // Main function
    public static void main(String[] args) {
        ArrayBinaryTree tree = new ArrayBinaryTree(15); // Tree with capacity of 15 nodes

        // Insert nodes
        tree.insert(50);
        tree.insert(30);
        tree.insert(70);
        tree.insert(20);
        tree.insert(40);
        tree.insert(60);
        tree.insert(80);

        // In-order traversal
        System.out.print("In-order Traversal: ");
        tree.inOrderTraversal(0);
        System.out.println();

        // Search for a value
        int key = 40;
        if (tree.search(key)) {
            System.out.println("Value " + key + " found in the tree.");
        } else {
            System.out.println("Value " + key + " not found in the tree.");
        }

        // Find minimum and maximum values
        System.out.println("Minimum value in the tree: " + tree.findMin());
        System.out.println("Maximum value in the tree: " + tree.findMax());

        // Delete a node
        tree.delete(50);
        System.out.print("In-order Traversal after deleting 50: ");
        tree.inOrderTraversal(0);
        System.out.println();
    }
}
`
    }
};
function toggleNightMode() {
    document.body.classList.toggle("night-mode");
}
function updateCode() {
    const language = document.getElementById("language").value;
    const operation = document.getElementById("operation").value;
    const codeDisplay = document.getElementById("code-display");

    // Get the appropriate code based on the selected language and operation
    const code = codeSnippets[language][operation];

    // Set the code content
    codeDisplay.textContent = code;

    // Apply syntax highlighting using Prism.js
    Prism.highlightElement(codeDisplay);
}

