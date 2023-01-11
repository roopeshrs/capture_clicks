document.body.addEventListener('click', openDrawer);

function openDrawer (e) {
    const isWidgetExist = document.querySelector('.widget');
    if (!e.target.closest('.widget')){
        if(isWidgetExist){
            isWidgetExist.remove();
            createWidget(e);
        }else{
            createWidget(e);
        }
    }
}

function createWidget (e) {
    const clickedElement = e.target.tagName;
    const widget = document.createElement("div");
    widget.innerHTML = `
        <form>
            <div class="close">&#10006;</div>
            <h4>
                Title : <input type="text" value=${clickedElement} disabled />
            </h4>
            <h4>
                Description : <br/><textarea></textarea>
            </h4>
            <div>
                <button type="submit">submit</button>
            </div>
        </form>
    `;
    widget.classList.add('widget');
    document.body.appendChild(widget);
    widget.querySelector('.close').addEventListener('click', () => {
        widget.remove();
    })
    widget.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            title: clickedElement,
            description: widget.querySelector('textarea').value,
        }
        sendData(data, widget);
        widget.remove();
    });
}

function sendData (data) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })
}