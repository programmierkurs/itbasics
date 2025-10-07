const categories = {
    length: {
        label: "Länge",
        units: {
            millimeter: { label: "Millimeter (mm)", toBase: v => v / 1000, fromBase: v => v * 1000 },
            centimeter: { label: "Zentimeter (cm)", toBase: v => v / 100, fromBase: v => v * 100 },
            meter: { label: "Meter (m)", toBase: v => v, fromBase: v => v },
            kilometer: { label: "Kilometer (km)", toBase: v => v * 1000, fromBase: v => v / 1000 },
            inch: { label: "Zoll (in)", toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
            foot: { label: "Fuß (ft)", toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
            mile: { label: "Meile (mi)", toBase: v => v * 1609.344, fromBase: v => v / 1609.344 }
        }
    },
    weight: {
        label: "Gewicht",
        units: {
            gram: { label: "Gramm (g)", toBase: v => v / 1000, fromBase: v => v * 1000 },
            kilogram: { label: "Kilogramm (kg)", toBase: v => v, fromBase: v => v },
            ton: { label: "Tonne (t)", toBase: v => v * 1000, fromBase: v => v / 1000 },
            ounce: { label: "Unze (oz)", toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
            pound: { label: "Pfund (lb)", toBase: v => v * 0.453592, fromBase: v => v / 0.453592 }
        }
    },
    temperature: {
        label: "Temperatur",
        units: {
            celsius: {
                label: "Celsius (°C)",
                toBase: v => v,
                fromBase: v => v
            },
            kelvin: {
                label: "Kelvin (K)",
                toBase: v => v - 273.15,
                fromBase: v => v + 273.15
            },
            fahrenheit: {
                label: "Fahrenheit (°F)",
                toBase: v => (v - 32) * (5 / 9),
                fromBase: v => (v * 9) / 5 + 32
            }
        }
    },
    volume: {
        label: "Volumen",
        units: {
            milliliter: { label: "Milliliter (ml)", toBase: v => v / 1000, fromBase: v => v * 1000 },
            liter: { label: "Liter (l)", toBase: v => v, fromBase: v => v },
            cubicMeter: { label: "Kubikmeter (m³)", toBase: v => v * 1000, fromBase: v => v / 1000 },
            teaspoon: { label: "Teelöffel (tl)", toBase: v => v * 0.00492892, fromBase: v => v / 0.00492892 },
            tablespoon: { label: "Esslöffel (el)", toBase: v => v * 0.0147868, fromBase: v => v / 0.0147868 },
            cup: { label: "Cup (US)", toBase: v => v * 0.236588, fromBase: v => v / 0.236588 },
            gallon: { label: "Gallone (US)", toBase: v => v * 3.78541, fromBase: v => v / 3.78541 }
        }
    }
};

const categorySelect = document.getElementById("category");
const fromUnitSelect = document.getElementById("fromUnit");
const toUnitSelect = document.getElementById("toUnit");
const convertButton = document.getElementById("convert");
const swapButton = document.getElementById("swap");
const resultText = document.getElementById("resultValue");
const inputValue = document.getElementById("inputValue");

function fillUnitSelects(categoryKey) {
    const { units } = categories[categoryKey];
    const entries = Object.entries(units);

    [fromUnitSelect, toUnitSelect].forEach(select => {
        select.innerHTML = "";
        entries.forEach(([unitKey, unit]) => {
            const option = document.createElement("option");
            option.value = unitKey;
            option.textContent = unit.label;
            select.appendChild(option);
        });
    });

    toUnitSelect.selectedIndex = Math.min(1, entries.length - 1);
}

function formatNumber(value) {
    if (Number.isNaN(value) || !Number.isFinite(value)) {
        return "Ungültiges Ergebnis";
    }

    const abs = Math.abs(value);
    const formatter = new Intl.NumberFormat("de-DE", {
        maximumFractionDigits: abs < 1 ? 6 : abs < 1000 ? 4 : 2
    });

    return formatter.format(value);
}

function convert() {
    const categoryKey = categorySelect.value;
    const value = Number.parseFloat(inputValue.value);

    if (Number.isNaN(value)) {
        resultText.textContent = "Bitte gib einen gültigen numerischen Wert ein.";
        return;
    }

    const { units } = categories[categoryKey];
    const fromUnit = units[fromUnitSelect.value];
    const toUnit = units[toUnitSelect.value];

    if (!fromUnit || !toUnit) {
        resultText.textContent = "Bitte wähle zwei Einheiten aus.";
        return;
    }

    const baseValue = fromUnit.toBase(value);
    const converted = toUnit.fromBase(baseValue);
    const formatted = formatNumber(converted);

    const fromLabel = fromUnit.label.split("(")[0].trim();
    const toLabel = toUnit.label.split("(")[0].trim();

    resultText.textContent = `${formatNumber(value)} ${fromLabel} entsprechen ${formatted} ${toLabel}.`;
}

categorySelect.addEventListener("change", event => {
    fillUnitSelects(event.target.value);
    convert();
});

convertButton.addEventListener("click", convert);

swapButton.addEventListener("click", () => {
    const from = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = from;
    convert();
});

inputValue.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        convert();
    }
});

fillUnitSelects(categorySelect.value);
convert();

