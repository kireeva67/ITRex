function countKayakAmount(weights, carrying) {
  let kayakAmount = 0;

  weights.sort((a, b) => {
    return b - a;
  });
  let maxWeight = weights[0];
  if (maxWeight > carrying) {
    return "Sorry, your team can`t raft";
  }

  while (weights.length !== 0) {
    maxWeight = weights[0];
    weights.splice(0, 1);
    console.log(weights);
    let isPartnerFound = false;

    for (let ch = 0; ch < weights.length; ch++) {
      if (maxWeight + weights[ch] <= carrying) {
        weights.splice(ch, 1);
        kayakAmount++;
        isPartnerFound = true;
        break;
      }
    }

    if (!isPartnerFound) {
      kayakAmount++;
    }
  }
  return kayakAmount;
}

countKayakAmount([50, 120, 74, 60, 100, 82], 135);
