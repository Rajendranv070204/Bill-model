const options = {
    Rice: {
        "Veg rice": 80,
        "Jeera rice": 90,
        "Kalan rice": 90,
        "Paneer rice": 100,
        "Egg rice": 80,
        "Chicken rice": 100
    },
    TandooriRotti: {
        "Rotti": 17.5,
        "Naan": 25,
        "Butter rotti": 25,
        "Butter naan": 35
    },
    Gravy: {
        "Dal": 60,
        "Senna masala": 80,
        "Gobi masala": 80,
        "Paneer butter": 100,
        "Kalan gravy": 100,
        "Chicken gravy": 130,
        "Chettinad gravy": 150,
        "Pepper chicken": 150,
        "Katai gravy": 130,
        "Nattukoli gravy": 220,
        "Pallipalayam gravy": 150,
        "Egg macala": 80,
        "Egg Keema": 80
    },
    Starters: {
        "Paneer 65": 80,
        "Gobi 65": 80,
        "Kalan": 100,
        "chicken 65": 100,
        "Bran 65": 150,
        "Nantu lollipop": 150,
        "Chicken lollipop": 100,
        "Katai 65": 120,
        "Fish finger": 150
    },
    Soup: {
        "Veg clear": 30,
        "Chicken soup": 40,
        "Nattukkoli soup": 50
    },
    Biryani: {
        "Chicken biryani": 120,
        "Chicken 65 biryani": 120,
        "Egg biryani": 80,
        "MD biryani": 60
    },
    Egg: {
        "Omelet": 30,
        "Egg fry": 40,
        "Appayil": 15,
        "Pulpayil": 15
    },
    Tandoori: {
        "tandoori(FULL)": 350,
        "tandoori(HALF)": 180,
        "Grill(FULL)": 350,
        "Grill(HALF)": 200
    },
    Soda: {
        "Coke": 20,
        "Soda": 35,
        "Sprite": 20
    }
};

const categorySelect = document.getElementById('category');
const menuSelect = document.getElementById('menu');
const priceInput = document.getElementById('price');
let totalPrice = 0;
let totalQuantity = 0;

categorySelect.addEventListener('change', function () {
    const selectedCategory = this.value;
    menuSelect.innerHTML = '<option value="" disabled selected>Choose an Item</option>';
    if (options[selectedCategory]) {
        Object.keys(options[selectedCategory]).forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            menuSelect.appendChild(option);
        });
    }
});

menuSelect.addEventListener('change', function () {
    const selectedCategory = categorySelect.value;
    const selectedMenu = this.value;
    if (selectedCategory && selectedMenu) {
        priceInput.value = options[selectedCategory][selectedMenu];
    }
});

document.getElementById('billForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const menu = menuSelect.value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(priceInput.value);
    const itemTotalPrice = quantity * price;

    totalPrice += itemTotalPrice;
    totalQuantity += quantity;

    const tableBody = document.querySelector('#billTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${menu}</td>
        <td>${quantity}</td>
        <td>₹${itemTotalPrice.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);

    // Add a blank row for spacing
    const blankRow = document.createElement('tr');
    blankRow.innerHTML = ` 
        <td colspan="3" style="height: 3px;"></td>
    `;
    tableBody.appendChild(blankRow);

    // Update total quantity and total price
    document.getElementById('totalQuantity').textContent = totalQuantity;
    document.getElementById('totalPrice').textContent = `₹${totalPrice.toFixed(2)}`;

    // Reset the form
    document.getElementById('billForm').reset();
    menuSelect.innerHTML = '<option value="" disabled selected>Choose an Item</option>';
});

function downloadTableAsText() {
    const table = document.getElementById('billTable');
    const rows = table.querySelectorAll('tr');
    let textContent = '';
    const columnWidths = [18, 12, 10];
    rows.forEach((row, index) => {
        const cols = row.querySelectorAll('th, td');
        const rowData = Array.from(cols)
            .map((col, i) => col.innerText.padEnd(columnWidths[i], ' '))
            .join('|');
        textContent += rowData + '\n';
        if (index === 0) {
            const separator = columnWidths.map(width => '-'.repeat(width)).join('+');
            textContent += separator + '\n';
        }
        if (index === 1) {
            const separator = columnWidths.map(width => '-'.repeat(width)).join('+');
            textContent += separator + '\n';
        }
    });
    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'BillTable.txt';
    link.click();
}

// Function to format the date as YYYY-MM-DD
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Set the current date in the table header
document.getElementById('currentDate').textContent = formatDate(new Date());