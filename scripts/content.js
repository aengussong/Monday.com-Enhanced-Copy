const rootDOM = document.querySelector('[id="application"]');

// @param value - ticket row
function enhanceCopyField(value, index, arr) {
	const ticketIdField = value.querySelector('[id^="copy_pulse_id_cell_"]');
	const ticketNameField = value.querySelector('[class="name-cell-text"]');
	const ticketNameContainer = value.querySelector("span");

	if (ticketIdField && ticketNameContainer) {
		const ticketId = ticketIdField.textContent;
		const ticketName = ticketNameContainer.textContent;
		const enhancedCopyInfo = ticketId + " - " + ticketName;
		ticketIdField.onclick = function() {navigator.clipboard.writeText(enhancedCopyInfo)};
	}
}

function updateTicketRows() {
	// each id of DOM row, containing ticket info, ends with -notplaceholder
	const article = document.querySelectorAll('[id$="-notplaceholder"]');
	
	article.forEach(enhanceCopyField);
}

const config = { attributes: false, childList: true, subtree: true };
const mutationCallback = (mutationList, observer) => {
	for (const mutation of mutationList) {
		if (mutation.type === "childList") {
			updateTicketRows();
		}
	}
};

// as monday board is very dynamic (each scroll adds and removes ticket rows, we should
// observe page changes and update each ticket row dynamically)
const observer = new MutationObserver(mutationCallback);
observer.observe(rootDOM, config);