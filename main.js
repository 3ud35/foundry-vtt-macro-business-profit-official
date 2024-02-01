// To implement via dialog box
const nbDays = 1;
const bonus = 0;

// Depend on the business
const businessDailyMaintenanceFee = 10; // Official: 10 for trading post
const baseProfit = 2.5; // Official: 5

const rateCut = 0.5; // Specific on my campaign

// Base roll
const roll1 = await new Roll(`1d100+${nbDays}+${bonus}`).roll();
const result1 = roll1.total

if (result1 <= 20) {
    let amount = 1.5 * businessDailyMaintenanceFee * nbDays;
    var resultText = `Vous devez payer les coûts de maintenance majorés pour chaque jour, soit un total de: ${amount}`;

} else if (result1 <= 30) {
    let amount = businessDailyMaintenanceFee * nbDays;
    var resultText = `Vous devez payer les coûts de maintenance pour chaque jour, soit un total de: ${amount}`;

} else if (result1 <= 40) {
    let amount = 0.5 * businessDailyMaintenanceFee * nbDays;
    var resultText = `Vous devez payer les coûts de maintenance non couverts par les profits pour chaque jour, soit un total de: ${amount}`;

} else if (result1 <= 60) {
    var resultText = "Les profits et les coûts sont à l'équilibre pour chaque jour.";

} else if (result1 <= 80) {
    // Profit roll
    const roll2 = await new Roll(`1d6`).roll();
    const result2 = roll2.total
    let amount = baseProfit * result2 * nbDays;
    let cut = amount * rateCut;
    let result = amount * (1 - rateCut);
    var resultText = `Les coûts sont couverts, vous réalisez un profit de : ${amount}po, la guilde des voleurs récupère ${cut}po, vous gardez ${result}`;

} else if (result1 <= 90) {
    // Profit roll
    const roll2 = await new Roll(`2d8`).roll();
    const result2 = roll2.total
    let amount = baseProfit * result2 * nbDays;
    let cut = amount * rateCut;
    let result = amount * (1 - rateCut);
    var resultText = `Les coûts sont couverts, vous réalisez un profit de : ${amount}po, la guilde des voleurs récupère ${cut}po, vous gardez ${result}`;

} else {
    // Profit roll
    const roll2 = await new Roll(`3d10`).roll();
    const result2 = roll2.total
    let amount = baseProfit * result2 * nbDays;
    let cut = amount * rateCut;
    let result = amount * (1 - rateCut);
    var resultText = `Les coûts sont couverts, vous réalisez un profit de : ${amount}po, la guilde des voleurs récupère ${cut}po, vous gardez ${result}`;
}

const results_html = `<h2>Résultat de la soirée</h2>
Avec un résultat de <a class="inline-result"><i class="fas fa-dice-d20"></i> ${result1}</a>, ${resultText}.`;

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({ token: actor }),
    content: results_html
});
