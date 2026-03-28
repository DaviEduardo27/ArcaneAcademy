// Compat layer local para WebView Android/offline.
// Se o GSAP real carregar depois via CDN, ele sobrescreve este shim sem impacto.
(function () {
    if (window.gsap) return;

    const RESERVED_KEYS = new Set([
        'duration', 'delay', 'ease', 'overwrite', 'repeat', 'yoyo',
        'stagger', 'onComplete', 'onUpdate', 'clearProps'
    ]);
    const TRANSFORM_KEYS = new Set(['x', 'y', 'scale', 'rotation', 'rotateY']);
    const tickerCallbacks = new Set();
    let tickerRunning = false;

    function startTicker() {
        if (tickerRunning) return;
        tickerRunning = true;
        const tick = () => {
            tickerCallbacks.forEach((callback) => {
                try { callback(); } catch (error) {}
            });
            if (tickerCallbacks.size) requestAnimationFrame(tick);
            else tickerRunning = false;
        };
        requestAnimationFrame(tick);
    }

    function toArray(target) {
        if (!target) return [];
        if (typeof target === 'string') return Array.from(document.querySelectorAll(target));
        if (Array.isArray(target)) return target.flatMap((item) => toArray(item));
        if (target instanceof NodeList || target instanceof HTMLCollection) return Array.from(target);
        return [target];
    }

    function isElement(target) {
        return !!target && target.nodeType === 1;
    }

    function parseRelativeValue(currentValue, nextValue) {
        if (typeof nextValue !== 'string') return nextValue;
        const match = nextValue.match(/^([+-]=)\s*(-?\d+(\.\d+)?)$/);
        if (!match) return nextValue;
        const delta = Number(match[2]);
        return match[1] === '+=' ? currentValue + delta : currentValue - delta;
    }

    function applyClearProps(target, clearProps) {
        if (!isElement(target) || !clearProps) return;
        if (clearProps === 'all') {
            target.removeAttribute('style');
            delete target.__gsapFallbackTransform;
            return;
        }
        String(clearProps).split(',').map((item) => item.trim()).filter(Boolean).forEach((prop) => {
            if (prop === 'transform') {
                delete target.__gsapFallbackTransform;
                target.style.removeProperty('transform');
                return;
            }
            target.style.removeProperty(prop.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`));
        });
    }

    function formatStyleValue(prop, value) {
        if (typeof value !== 'number') return value;
        if (prop === 'opacity' || prop === 'zIndex' || prop === 'fontWeight' || prop === 'zoom') return String(value);
        return `${value}px`;
    }

    function applyTransform(target, key, value) {
        if (!isElement(target)) return;
        const state = target.__gsapFallbackTransform || { x: 0, y: 0, scale: 1, rotation: 0, rotateY: 0 };
        const currentValue = Number(state[key]) || 0;
        state[key] = parseRelativeValue(currentValue, value);
        target.__gsapFallbackTransform = state;
        target.style.transform =
            `translate(${state.x}px, ${state.y}px) scale(${state.scale}) rotate(${state.rotation}deg) rotateY(${state.rotateY}deg)`;
    }

    function applyProp(target, key, value) {
        if (key === 'clearProps') {
            applyClearProps(target, value);
            return;
        }
        if (TRANSFORM_KEYS.has(key)) {
            applyTransform(target, key, value);
            return;
        }

        if (isElement(target)) {
            if (key in target.style) {
                const currentRaw = target.style[key];
                const current = Number.parseFloat(currentRaw) || 0;
                const resolved = parseRelativeValue(current, value);
                target.style[key] = formatStyleValue(key, resolved);
                return;
            }
            if (key in target) {
                const current = Number(target[key]) || 0;
                target[key] = parseRelativeValue(current, value);
                return;
            }
            target.style.setProperty(key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`), formatStyleValue(key, value));
            return;
        }

        if (target && typeof target === 'object') {
            const current = Number(target[key]) || 0;
            target[key] = parseRelativeValue(current, value);
        }
    }

    function applyVars(target, vars) {
        Object.entries(vars || {}).forEach(([key, value]) => {
            if (RESERVED_KEYS.has(key)) return;
            applyProp(target, key, value);
        });
        if (vars && vars.clearProps) applyClearProps(target, vars.clearProps);
        if (vars && typeof vars.onUpdate === 'function') {
            try { vars.onUpdate(); } catch (error) {}
        }
    }

    function runTween(target, vars, fromVars) {
        const targets = toArray(target);
        const delay = Number(vars && vars.delay) || 0;
        const duration = Number(vars && vars.duration) || 0;
        const stagger = Number(vars && vars.stagger) || 0;

        targets.forEach((item, index) => {
            if (!item) return;
            if (fromVars) applyVars(item, fromVars);
            const stepDelay = (delay + (stagger * index)) * 1000;
            window.setTimeout(() => applyVars(item, vars), stepDelay);
        });

        const completeDelay = (delay + duration + (stagger * Math.max(0, targets.length - 1))) * 1000;
        if (vars && typeof vars.onComplete === 'function') {
            window.setTimeout(() => {
                try { vars.onComplete(); } catch (error) {}
            }, completeDelay);
        }

        return { kill() {} };
    }

    window.gsap = {
        to(target, vars) {
            return runTween(target, vars);
        },
        fromTo(target, fromVars, toVars) {
            return runTween(target, toVars, fromVars);
        },
        from(target, vars) {
            return runTween(target, vars);
        },
        set(target, vars) {
            toArray(target).forEach((item) => applyVars(item, vars));
            return { kill() {} };
        },
        killTweensOf() {},
        ticker: {
            add(callback) {
                if (typeof callback !== 'function') return;
                tickerCallbacks.add(callback);
                startTicker();
            },
            remove(callback) {
                tickerCallbacks.delete(callback);
            }
        }
    };
})();
