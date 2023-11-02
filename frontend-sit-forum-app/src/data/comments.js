export const getCommentsData = async () => {
    return [
        {
            _id: "10",
            user: {
                _id: "a",
                name: "Mohammad Rezaii",
            },
            desc: "it was a nice post, Thank you!",
            post: "1",
            parent: null,
            replyOnUser: null,
            createdAt: "2022-12-31T17:22:05.092+0000",
        },
        {
            _id: "11",
            user: {
                _id: "b",
                name: "Paul M. Willians",
            },
            desc: "a reply for Mohammad",
            post: "1",
            parent: "10",
            replyOnUser: "a",
            createdAt: "2022-12-31T17:22:05.092+0000",
        },
        {
            _id: "12",
            user: {
                _id: "b",
                name: "Paul M. Willians",
            },
            desc: "Keep it up bro",
            post: "1",
            parent: null,
            replyOnUser: null,
            createdAt: "2023-12-31T17:22:05.092+0000",
        },
        {
            _id: "13",
            user: {
                _id: "c",
                name: "Jess",
            },
            desc: "i am interested",
            post: "1",
            parent: null,
            replyOnUser: null,
            createdAt: "2023-12-31T17:22:05.092+0000",
        },

    ];
};