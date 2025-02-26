const _ = {};
_.signupdata = () => {
    return [{
        id: 1,
        name: "email",
        required: true,
    },
    {
        id: 2,
        name: "fullname",
        required: false
    },
    {
        id: 3,
        name: "password",
        required: true
    }
    ]
};

export default _;