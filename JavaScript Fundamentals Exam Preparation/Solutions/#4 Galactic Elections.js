function galacticElections(ballots) {
    const starSystemVotes = new Map();

    for (const ballot of ballots) {
        if (!starSystemVotes.has(ballot["system"])) {
            starSystemVotes.set(ballot["system"], new Map());
        }

        const systemVotes = starSystemVotes.get(ballot["system"]);
        const ballotCandidate = ballot["candidate"];

        if (!systemVotes.has(ballotCandidate)) {
            systemVotes.set(ballotCandidate, 0);
        }

        systemVotes.set(ballotCandidate, systemVotes.get(ballotCandidate) + Number(ballot["votes"]));
    }

    const candidateVotes = new Map();

    for (const [starSystemName, starSystem] of starSystemVotes) {
        const maxVotes = Math.max(...starSystem.values());

        for (const [candidateName, candidateValue] of starSystem) {
            if (candidateValue === maxVotes) {
                if (!candidateVotes.has(candidateName)) {
                    candidateVotes.set(candidateName, new Map([["votes", 0], ["systems", new Map()]]));
                }

                const votesSum = Array.from(starSystem.values()).reduce((a, b) => a + b);

                const candidate = candidateVotes.get(candidateName);

                const systems = candidate.get("systems");

                candidate.set("votes", candidate.get("votes") + votesSum);

                if (!systems.has(starSystemName)) {
                    systems.set(starSystemName, 0);
                }

                systems.set(starSystemName, systems.get(starSystemName) + votesSum);

                break;
            }
        }
    }

    if (candidateVotes.size === 1) {
        const [name, entry] = candidateVotes.entries().next().value;

        return `${name} wins with ${entry.get("votes")} votes\n${name} wins unopposed!`;
    }

    const candidateVotesArray = Array.from(candidateVotes);

    const votesSum = candidateVotesArray.map(([key, value]) => value.get("votes")).reduce((a, b) => a + b);

    for (const [candidateName, candidateValue] of candidateVotes) {
        const votes = candidateValue.get("votes");
        const percentageVotes = Math.floor(votes / votesSum * 100);

        if (percentageVotes > 50) {
            const secondaryMaxVotes = Math.max(candidateVotesArray
                .filter(([name, value]) => name !== candidateName)
                .map(([name, value]) => value.get("votes"))
            );

            console.log(candidateVotesArray.filter(([name, value]) => value.get("votes") === secondaryMaxVotes));

            const [runnerUpName, runnerUpValue] = candidateVotesArray.filter(([name, value]) => value.get("votes") === secondaryMaxVotes)[0];

            return `${candidateName} wins with ${votes} votes\nRunner up: ${runnerUpName}\n${
                Array.from(runnerUpValue.get("systems"))
                    .sort(([key1, value1], [key2, value2]) => value2 - value1)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join("\n")
            }`;
        }

        candidateValue.set("percentage votes", percentageVotes);
    }

    const [[firstName, firstValue], [secondName, secondValue], ...rest] = candidateVotesArray
        .sort(([key1, value1], [key2, value2]) => value2.get("percentage votes") - value1.get("percentage votes"));

    return `Runoff between ${firstName} with ${firstValue.get("percentage votes")}% and ${secondName} with ${secondValue.get("percentage votes")}%`;
}

console.log(galacticElections([{system: 'Theta', candidate: 'Flying Shrimp', votes: 10},
    {system: 'Sigma', candidate: 'Space Cow', votes: 200},
    {system: 'Sigma', candidate: 'Flying Shrimp', votes: 120},
    {system: 'Tau', candidate: 'Space Cow', votes: 15},
    {system: 'Sigma', candidate: 'Space Cow', votes: 60},
    {system: 'Tau', candidate: 'Flying Shrimp', votes: 150}]
));
console.log();
console.log(galacticElections([{system: 'Tau', candidate: 'Flying Shrimp', votes: 150},
    {system: 'Tau', candidate: 'Space Cow', votes: 100},
    {system: 'Theta', candidate: 'Space Cow', votes: 10},
    {system: 'Sigma', candidate: 'Space Cow', votes: 200},
    {system: 'Sigma', candidate: 'Flying Shrimp', votes: 75},
    {system: 'Omicron', candidate: 'Flying Shrimp', votes: 50},
    {system: 'Omicron', candidate: 'Octocat', votes: 75}]
));
console.log();
console.log(galacticElections([{system: 'Theta', candidate: 'Kim Jong Andromeda', votes: 10},
    {system: 'Tau', candidate: 'Kim Jong Andromeda', votes: 200},
    {system: 'Tau', candidate: 'Flying Shrimp', votes: 150}]
));
console.log();
galacticElections([
    {system: "Theta", candidate: "Kitler", votes: 50},
    {system: "Theta", candidate: "Space Cow", votes: 45},
    {system: "Theta", candidate: "Huge Manatee", votes: 45},
    {system: "Theta", candidate: "Flying Shrimp", votes: 45},
    {system: "Tau", candidate: "Kitler", votes: 50},
    {system: "Tau", candidate: "Space Cow", votes: 60},
    {system: "Sigma", candidate: "Kitler", votes: 50},
    {system: "Sigma", candidate: "Huge Manatee", votes: 60},
    {system: "Omicron", candidate: "Kitler", votes: 50}
])