function skillsMember() {
  var member = {
    name: 'John Doe',
    age: 30,
    skills: ['JavaScript', 'HTML', 'CSS'],
    address: {
      street: '40 Main st',
      city: 'Boston',
      state: 'MA'
    },
    getBirthYear: function() {
      return 2017 - this.age;
    }
  }

  return member;
}