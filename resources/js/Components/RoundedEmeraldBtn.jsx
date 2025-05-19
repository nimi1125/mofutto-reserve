const RoundedEmeraldBtn = ({ text, onClick  }) => {
    return (
        <button className="bg-emerald-500 text-center text-white rounded-3xl px-5 py-2 font-semibold"
        onClick={onClick}>
            {text}
        </button>
    );
    };

    export default RoundedEmeraldBtn;