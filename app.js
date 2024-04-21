import { BarretenbergBackend, BarretenbergVerifier as Verifier } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import noirjs_demo from './circuit/target/circuit.json';

const setup = async () => {
  await Promise.all([
    import('@noir-lang/noirc_abi').then((module) =>
      module.default(new URL('@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm', import.meta.url).toString()),
    ),
    import('@noir-lang/acvm_js').then((module) =>
      module.default(new URL('@noir-lang/acvm_js/web/acvm_js_bg.wasm', import.meta.url).toString()),
    ),
  ]);
};

document.addEventListener('DOMContentLoaded', async () => {
  const backend = new BarretenbergBackend(noirjs_demo);
  const noir = new Noir(noirjs_demo, backend);
  await setup();
  const input = { x: 1, y: 2 };
  display('logs', 'Generating proof... ⌛');
  const proof = await noir.generateProof(input);
  display('logs', 'Generating proof... ✅');
  display('results', proof.proof);
  display('logs', 'Verifying proof... ⌛');
  const verificationKey = await backend.getVerificationKey();
  const verifier = new Verifier();
  const isValid = await verifier.verifyProof(proof, verificationKey);
  if (isValid) display('logs', 'Verifying proof... ✅');
});

function display(container, msg) {
  const c = document.getElementById(container);
  const p = document.createElement('p');
  p.textContent = msg;
  c.appendChild(p);
}
