const valueEl = document.getElementById('value');
const fromUnitEl = document.getElementById('fromUnit');
const toUnitEl = document.getElementById('toUnit');
const btn = document.querySelector('[type=submit]');
const output = document.getElementById('result');

if (valueEl && fromUnitEl && toUnitEl && btn && output) {
    let converter = {
        value: null,
        fromUnit: null,
        toUnit: null,

        factors: {
            km: 1000,
            m: 1,
            dm: 0.1,
            cm: 0.01
        },

        setValues: function() {
            this.value = valueEl.value;
            this.fromUnit = fromUnitEl.value;
            this.toUnit = toUnitEl.value;
        },

        toMeters: function(v, unit) {
            const f = this.factors[unit];
            if (f === undefined) return null;
            return v * f;
        },

        fromMeters: function(v, unit) {
            const f = this.factors[unit];
            if (f === undefined) return null;
            return v / f;
        },

        convert: function() {
            const v = parseFloat(this.value);
            if (isNaN(v)) return null;

            const inMeters = this.toMeters(v, this.fromUnit);
            if (inMeters === null) return null;

            return this.fromMeters(inMeters, this.toUnit);
        }
    };

    btn.addEventListener('click', function(e) {
        e.preventDefault();

        converter.setValues();

        let result = converter.convert();

        if (result !== null) {
            result = Math.round(result * 1000000) / 1000000;
        }

        if (result === null || !isFinite(result)) {
            output.innerHTML = 'Chybný vstup!';
        } else {
            output.innerHTML = `${converter.value} ${converter.fromUnit} = ${result} ${converter.toUnit}`;
        }
    });
}