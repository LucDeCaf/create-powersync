import './style.css';

let count = 0;
const counterButton =
    document.querySelector<HTMLButtonElement>('#counter-button')!;

counterButton.addEventListener('click', () => {
    count++;
    counterButton.innerText = count.toString();
});
