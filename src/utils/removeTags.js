export const removeTag = (stringWithTag) => {
  if ((stringWithTag === null) || (stringWithTag === '')) return false;
  else return stringWithTag.toString().replace(/(<([^>]+)>)/ig, '');
};

// console.log(removeTag(`<p>this is my another blog description</p>`));