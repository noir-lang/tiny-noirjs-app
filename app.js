import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import circuit from './circuit/target/noirjs_demo.json';

document.addEventListener('DOMContentLoaded', async () => {
  const backend = new BarretenbergBackend(circuit);
  const noir = new Noir(circuit);
  const input = { x: 1, y: 2 };
  const { witness } = await noir.execute(input);
  display('logs', 'Generating proof... ⌛');
  const proof = await backend.generateProof(witness);
  display('logs', 'Generating proof... ✅');
  display('results', proof.proof);
  display('logs', 'Verifying proof... ⌛');
  const verification = await backend.verifyProof(proof);
  if (verification) display('logs', 'Verifying proof... ✅');
});

function display(container, msg) {
  const c = document.getElementById(container);
  const p = document.createElement('p');
  p.textContent = msg;
  c.appendChild(p);
}
