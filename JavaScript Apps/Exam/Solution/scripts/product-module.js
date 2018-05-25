const product = (function() {
    let activeReceipt;

    async function getActiveReceipt(userId) {
        let response = await requester.get("appdata", `receipts?query={"_acl.creator":"${userId}","active":"true"}`, "kinvey");

        if (response.length === 0) {
            activeReceipt = await createReceipt();
            return activeReceipt;
        } else if (response.length !== 1) {
            throw Error("Non-valid response");
        }

        response = response[0];

        activeReceipt = response;
        return response;
    }

    function getEntries(receiptId) {
        return requester.get("appdata", `entries?query={"receiptId":"${receiptId}"}`, "kinvey");
    }

    function createReceipt() {
        return requester.post("appdata", "receipts", "kinvey", {
            active: true,
            productCount: 0,
            total: 0
        });
    }

    function addEntry(type, quantity, price) {
        return requester.post("appdata", "entries", "kinvey", {
            type,
            quantity,
            price,
            receiptId: activeReceipt._id
        });
    }

    function deleteEntry(entryId) {
        requester.remove("appdata", `entries/${entryId}`, "kinvey");
    }

    function userReceipts(userId) {
        return requester.get("appdata", `receipts?query={"_acl.creator":"${userId}","active":"false"}`, "kinvey");
    }

    function receiptDetails(receiptId) {
        return requester.get("appdata", `receipts/${receiptId}`, "kinvey");
    }

    function commitReceipt(receiptId, productCount, total) {
        return requester.update("appdata", `receipts/${receiptId}`, "kinvey", {
            active: false,
            productCount,
            total
        });
    }

    return {
        getActiveReceipt,
        getEntries,
        //createReceipt, // <-- TODO: Make sure this is right
        addEntry,
        deleteEntry,
        userReceipts,
        receiptDetails,
        commitReceipt
    };
})();