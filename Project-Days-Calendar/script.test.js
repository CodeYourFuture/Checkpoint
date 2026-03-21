const makeElement = () => ({
    textContent: '',
    innerHTML: '',
    value: '',
    selected: false,
    classList: { add: () => {} },
    appendChild: () => {},
    addEventListener: () => {},
    onchange: null,
})

global.document = {
    querySelector: () => makeElement(),
    createElement: () => makeElement(),
};

const { renderMonth, renderYear, renderDay } = await import('./script.js')

text('renderMonth set January for index 0', () => {
    const h1 = makeElement();
    document.querySelector = () => h1;
    renderMonth(0);

    expect  (h1.textContent).toBe('January');
});

text('renderMonth sets December for index 11', () => {
    const h1 = makeElement();
    document.querySelector = () => h1;
    renderMonth(11);

    expect(h1.textContent).toBe('December');
});

text('renderDay sets correct day number', () => {
    // Call renderDay with 15 and check the returned element has 15 as text
    const day = renderDay(15);
    expect(day.textContent).toBe(15);
});

text('renderDay sets day 1', () => {
    const day = renderDay(1);
    expect(day.textContent).toBe(1)
});

// --- RenderYear test --- //
// renderYear receives a year (like 2026) and create a dropdown
// with every year from 1950 to 2050 (that's 101 options).
// It also marks the received year as the selected one

test('renderYear creates 101 options from 1950 to 2050', () => {
    // We track every element that gets created so we can count them
    const created = [];
    document.createElement = () => {
        const el = makeElement();
        created.push(el);
        return el;
    };
    document.querySelector = () => makeElement();

    renderYear(2026);

    // There should be exactly 101 options (2050 - 1950 + 1 = 101)
    expect(created.length).toBe(101);

    // The first option should be 1950 and the last should be 2050
    expect(created[0].value).toBe(1950);
    expect(created[100].value).toBe(2050);
});

test('renderYear marks the selected year', () => {
    const created = [];
    document.createElement = () => {
        const el = makeElement();
        created.push(el);
        return el;
    };
    document.querySelector = () => makeElement();

    renderYear(2000);

    // Find the option where selected is true - it should be year 2000
    const selected = created.find(el => el.selected === true);
    expect(selected.value).toBe(2000);
});