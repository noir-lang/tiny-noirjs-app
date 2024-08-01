import circuit from '../circuit/target/circuit.json';
import { BarretenbergBackend, BarretenbergVerifier as Verifier } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';

function display(container, msg) {
  const c = document.getElementById(container);
  const p = document.createElement('p');
  p.textContent = msg;
  c.appendChild(p);
}

document.getElementById('submitGuess').addEventListener('click', async () => {
  try {
    const backend = new BarretenbergBackend(circuit);
    const noir = new Noir(circuit);
    const x = parseInt(document.getElementById('guessInput').value);
    const input = { x, y: 2 };
    display('logs', 'Generating proof... ⌛');
    const { witness } = await noir.execute(input);
    const proof = await backend.generateProof(witness);
    display('logs', 'Generating proof... ✅');
    display('results', proof.proof);
    display('logs', 'Verifying proof... ⌛');
    const isValid = await backend.verifyProof(proof)
    // or to cache and use the verification key:
    // const verificationKey = await backend.getVerificationKey();
    // const verifier = new Verifier();
    // const isValid = await verifier.verifyProof(proof, verificationKey);
    if (isValid) display('logs', 'Verifying proof... ✅');
  } catch (err) {
    console.log(err)
    display('logs', 'Oh 💔 Wrong guess');
  }
});