const delayField = document.querySelector('[name=delay]');
const stepField = document.querySelector('[name=step]');
const amountField = document.querySelector('[name=amount]');
const createBtn = document.querySelector('button');


createBtn.addEventListener('click', event => {
  event.preventDefault();


  for (let i = 0; i < Number(amountField.value); i += 1) {
    const delays = Number(delayField.value) + stepField.value * i;
    createPromise(i+1, delays)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })

      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);;
      });
  }
  document.querySelector('.form').reset();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });

      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

