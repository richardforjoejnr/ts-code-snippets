/*
Sample updateTitle object
{
  name: 'James Bond',
}
*/

export const updatePersonDetails = (details = {}) => {
  const personDetails = {
    type: "data",
    name: "John Doe",
    age: 30,
    title: "Senior Developer",
    comment: "This is a sample comment for demonstration purposes."
  };

  // Iterate over the keys of the details object
  Object.keys(details).forEach(key => {
    if (personDetails.hasOwnProperty(key)) {
      personDetails[key] = details[key]; // Update the value for the given key
      console.log(`Updated ${key} to ${details[key]}`);
    } else {
      console.log(`The key '${key}' does not exist in the personDetails object.`);
    }
  });

  const response = personDetails

  return response;
};
