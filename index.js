import { Noir } from "@noir-lang/noir_js";
import { UltraHonkBackend } from "@aztec/bb.js";
import circuit from "./circuit/target/circuit.json";
import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import acvm from "@noir-lang/acvm_js/web/acvm_js_bg.wasm?url";
import noirc from "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url";

await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);

const show = (id, content) => {
  const container = document.getElementById(id);
  container.appendChild(document.createTextNode(content));
  container.appendChild(document.createElement("br"));
};

document.getElementById("submit").addEventListener("click", async () => {
  try {
    // Construct noir instance from the circuit
    const noir = new Noir(circuit);

	// Initialize the backend
    const backend = new UltraHonkBackend(circuit.bytecode);

	// Prepare inputs
    const age = document.getElementById("age").value;
	const circuitInputs = { age };

    show("logs", "Generating witness... ⏳");
    const { witness } = await noir.execute(circuitInputs);
    show("logs", "Generated witness... ✅");
	
    show("logs", "Generating proof... ⏳");
    const proof = await backend.generateProof(witness);
    show("logs", "Generated proof... ✅");
    show("results", proof.proof);

    show("logs", "Verifying proof... ⌛");
    const isValid = await backend.verifyProof(proof);
    show("logs", `Proof is ${isValid ? "valid" : "invalid"}... ✅`);
  } catch (err) {
    console.error(err);
    show("logs", "Oh 💔");
  }
});
