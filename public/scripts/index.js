import Modal from './modal.js';

const deleteModal = Modal({ id: 'delete-modal', animateClasses: ['animate-pop', 'back'] })
const endedModal = Modal({ id: 'ended-modal', animateClasses: ['animate-pop', 'back'] })

const cards = document.querySelectorAll('.cards .card')
const deleteForm = document.querySelector('#delete-job')
const endedForm = document.querySelector('#ended-job')

for (let card of cards) {
  const cardId = card.dataset.id

  const deleteButton = card.querySelector('button.delete')
  deleteButton.onclick = () => {
    deleteModal.open()
    deleteForm.setAttribute('action', '/job/delete/' + cardId)
  }

  const endedButton = card.querySelector('button.close')
  if(endedButton){
    endedButton.onclick = () => {
      endedModal.open()
      endedForm.setAttribute('action', `/job/${cardId}/status_update`)
    }
  }
}

const search_input = document.querySelector('#search_input');
const jobs_list = document.querySelector('.cards');

search_input.addEventListener('keyup', () => {
  const filter = search_input.value.toUpperCase();
  const cards = jobs_list.getElementsByClassName('card');

  for (let i = 0; i < cards.length; i++) {
    const name = cards[i].getElementsByClassName('name')[0].innerHTML;

    if (name) {
      if (name.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }
});