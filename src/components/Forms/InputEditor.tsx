import { FC } from "react";
import "./InputEditor.css";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import Skeleton from "react-loading-skeleton";

interface InputProps {
  label?: string;
  id: string;
  name: string;
  disabled?: boolean;
  loadingRender?: boolean;
  value?: any;
  onChange?: any;
  errorMessage?: any;
}

const InputEditor: FC<InputProps> = (props) => {
  const {
    label,
    id,
    name,
    disabled,
    loadingRender,
    value,
    onChange,
    errorMessage,
  } = props;

  return (
    <>
      {loadingRender ? (
        <div>
          <Skeleton height={20} width={100} className="mb-2" />
          <Skeleton height={100} borderRadius={24} />
        </div>
      ) : (
        <div>
          <label htmlFor={id} className="block mb-2 font-medium">
            {label}
          </label>
          <div
            className={`${disabled ? "bg-slate-100" : ""} ${
              errorMessage ? "error" : ""
            }`}
          >
            <EditorProvider>
              <Editor
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
              >
                <Toolbar>
                  <BtnUndo />
                  <BtnRedo />
                  <div className="rsw-separator"></div>
                  <BtnBold />
                  <BtnItalic />
                  <BtnUnderline />
                  <BtnStrikeThrough />
                  <div className="rsw-separator"></div>
                  <BtnNumberedList />
                  <BtnBulletList />
                </Toolbar>
              </Editor>
            </EditorProvider>
          </div>
          {errorMessage && (
            <div className="text-red-600 text-xs ml-3 mt-1">{errorMessage}</div>
          )}
        </div>
      )}
    </>
  );
};

export default InputEditor;
