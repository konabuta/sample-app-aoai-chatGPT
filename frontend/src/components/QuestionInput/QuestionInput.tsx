import { useState } from "react";
import { Stack, TextField, Checkbox } from "@fluentui/react";
import { SendRegular } from "@fluentui/react-icons";
import Send from "../../assets/Send.svg";
import styles from "./QuestionInput.module.css";

interface Props {
    onSend: (question: string, id?: string) => void;
    disabled: boolean;
    placeholder?: string;
    clearOnSend?: boolean;
    conversationId?: string;
    searchFlag: boolean;
    setSearchFlag?: (searchFlag: boolean) => void;
    isFirst: boolean;
}

interface SendQuestionProps {
    disabled: boolean;
    question: string;
    conversationId?: string;
    onSend: (question: string, id?: string) => void;
    clearOnSend?: boolean;
}

interface OnEnterPressProps {
    key: string;
    shiftKey: boolean;
    nativeEvent?: { isComposing?: boolean };
}

interface OnQuestionChangeProps {
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>;
    newValue?: string;
}

interface SendQuestionDisabledProps {
    disabled: boolean;
    question: string;
}

interface TextFieldProps {
    className: string;
    placeholder?: string;
    multiline: boolean;
    resizable: boolean;
    borderless: boolean;
    value: string;
    onChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
    onKeyDown: (ev: React.KeyboardEvent<Element>) => void;
}

interface SendButtonProps {
    role: string;
    tabIndex: number;
    ariaLabel: string;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent<Element>) => void;
    sendQuestionDisabled: boolean;
    className: string;
    src?: string;
}

export const QuestionInput = ({ onSend, disabled, placeholder, clearOnSend, conversationId, searchFlag, setSearchFlag, isFirst }: Props) => {
    const [question, setQuestion] = useState<string>("");

    const sendQuestion = () => {
        if (disabled || !question.trim()) {
            return;
        }

        if (conversationId) {
            onSend(question, conversationId);
        } else {
            onSend(question);
        }

        if (clearOnSend) {
            setQuestion("");
        }
    };

    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey && !(ev.nativeEvent?.isComposing === true)) {
            ev.preventDefault();
            sendQuestion();
        }
    };

    const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setQuestion(newValue || "");
    };

    const sendQuestionDisabled = disabled || !question.trim();

    return (
        <Stack horizontal className={styles.questionInputContainer}>
            <TextField
                className={styles.questionInputTextArea}
                placeholder={placeholder}
                multiline
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
            />
            <Checkbox
                className={styles.questionInputCheckbox}
                label="Activate on your data"
                checked={searchFlag}
                onChange={() => setSearchFlag && setSearchFlag(!searchFlag)}
                disabled={!isFirst}
            />
            <div className={styles.questionInputSendButtonContainer}
                role="button"
                tabIndex={0}
                aria-label="Ask question button"
                onClick={sendQuestion}
                onKeyDown={e => e.key === "Enter" || e.key === " " ? sendQuestion() : null}
            >
                {sendQuestionDisabled ?
                    <SendRegular className={styles.questionInputSendButtonDisabled} />
                    :
                    <img src={Send} className={styles.questionInputSendButton} />
                }
            </div>
            <div className={styles.questionInputBottomBorder} />
        </Stack>
    );
};
