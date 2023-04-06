import { TeamTable } from "../components/TeamTable/Table";
// import { teamData } from "../services/teamData";
import { Section } from "../components/Section/Section";
import { sectionFourTitle, sectionFourContent } from "../services/pageData";
import { useDispatch, useSelector } from "react-redux";
import { resetTable } from "../reducers/table";
import { CustomAlert } from "../components/Alert/CustomAlert";
import { useState } from "react";
import { ConfirmationModal } from "../components/Modal/ConfirmationModal";
import { toggleModal } from "../reducers/modal";
import { setMessage, toggleAlert } from "../reducers/alerts";
import { FeaturedImage } from "../components/FeaturedImage/FeaturedImage";

export const Teams = () => {
  const [btnDisabled, setBtnDisabled] = useState(false);

  const table = useSelector((state: any) => state.table);
  const dispatch = useDispatch();
  const tableData = JSON.parse(JSON.stringify(table.value.data));
  const alertData = useSelector((state: any) => state.alert);

  document.title = "MTB Teams";

  const handleResetBtn = () => {
    dispatch(resetTable());
    dispatch(setMessage("Table reset successfully."));
    dispatch(toggleAlert(true));
    setBtnDisabled(true);
    setTimeout(() => {
      dispatch(toggleAlert(false))
      setBtnDisabled(false);
    }, 1000 * 2);
  };

  const modalData = useSelector((state: any) => state.modal);

  return (
    <>
      <FeaturedImage src={'https://img.redbull.com/images/c_crop,x_0,y_0,h_4644,w_8256/c_fill,w_1820,h_1071/q_auto:low,f_auto/redbullcom/2022/6/21/fc9itii98dyr4imm5z1a/crankworx-stop-1-innsbruck-full-recap-program-szymon-godziek'} alt={'bike-race'} />

      <h1 className="text-dark my-4 py-4 text-center">Teams</h1>

      <div className="mb-5 pb-2">
      <ConfirmationModal
        show={modalData.value.showModal}
        onHide={() => dispatch(toggleModal(false))} />

        <TeamTable options={table.value.app} data={tableData} />
        <button
          className="btn btn-secondary text-white"
          style={{ width: "100%" }}
          onClick={handleResetBtn}
          disabled={btnDisabled}
        >
          Reset
        </button>

        {alertData.value.showAlert ? <CustomAlert /> : null}
      </div>

      <Section
        className="mt-5"
        title={sectionFourTitle}
        content={sectionFourContent}
        counter={"00"}
        bg={"gray"}
        showAside={false}
      />
    </>
  );
};
