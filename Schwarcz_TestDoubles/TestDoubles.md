# Test-Doubles

A test double is an object that replaces referenced objects that are used by a class under testing.
Doing so isolates the tested class from other components so that the test result is only dependant on the class alone, but not its dependencies.

Imagine a company that has to deliver an urgent bug-fix to its customers that has to happen as quickly as possible. During the pipeline, one of the tests fails because an object accesses a database that is currently unavailable. Although the program is technically ready for deployment, the pipeline is stuck because of a fauly test and the customers do not get their crucial bug-fix.

To avoid this, test doubles is used to prevent problems of this nature.

## Types of doubles

### Fake

A fake object is a simpler implementation of the originally used object, e.g. an in-memory database for testing purposes instead of a remote one.

### Stub

Stub objects inherit the behaviour of the classes or interfaces that should be mocked and implement all methods that may be called in the tests. A stub-object that replaces a database might save the arguments from an insert-call in a local list and perform manipulatinos on it when a delete or update is called.

### Mock

Mocking means to provide a simple interface that replaces the original object. Those interfaces can be initialized with simple if-this-then-that commands to simulate simple behaviour, but there is no self-implemented code behind it, let alone fields for saving data.

### Dummy

The simplest objects are dummy objects which do not do anything. They are used when there are some parameters in constructors or methods that need to be provided, but do not have any influence on the result.

## Spy

Every one of these mocking types can be expanded with a spy-functionality which tracks the different methods and parameters that the object under testing called.

You can find the presentation slides online: https://docs.google.com/presentation/d/1Z01xLK1386VN3cQMwRqRxTdtsY9njFBVv_fwWXDOmuk/edit?usp=sharing