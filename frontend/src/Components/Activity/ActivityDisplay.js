import React from "react";
import Modal from "../Modal/Modal";

const MyInput = ({
  label,
  validFeedback,
  invalidFeedback,
  change,
  ...otherProps
}) => (
  <>
    <label htmlFor={otherProps.id}>{label}</label>
    {["activityStartDate", "activityEndDate"].includes(otherProps.id) ? (
      <input {...otherProps} onInput={change} />
    ) : (
      <input {...otherProps} onChange={change} />
    )}
    <div className='valid-feedback'>{validFeedback}</div>
    <div className='invalid-feedback'>{invalidFeedback}</div>
  </>
);

const MySelect = ({
  label,
  validFeedback,
  invalidFeedback,
  children,
  change,
  ...otherProps
}) => (
  <>
    <label htmlFor={otherProps.id}>{label}</label>
    <select {...otherProps} onChange={change}>
      {children}
    </select>
    <div className='valid-feedback'>{validFeedback}</div>
    <div className='invalid-feedback'>{invalidFeedback}</div>
  </>
);

const ActivityDisplay = (props) => {
  return (
    <>
      {/* Start Modal */}
      <Modal
        class='modal-lg'
        id='activityModal'
        isUpdate={props.state.isUpdate}
        updateName={["Update Activity", "Add Activity"]}
        submit={props.activityButton}>
        <h5 className=''>
          {props.state.isUpdate ? "Update Activity" : "Add Activity"}
        </h5>
        <form>
          <div className='form-row mb-4'>
            {[
              { name: "title", class: "form-group col-md-8" },
              { name: "studentHead", class: "form-group col-md-4" },
            ].map((item, index) => (
              <div className={item.class} key={index}>
                <MyInput
                  {...props.state.formElements[item.name].elementConfig}
                  value={props.state.formElements[item.name].value}
                  change={(event) => props.inputHandler(event, item.name)}
                />
              </div>
            ))}
            {/* <div className='form-group col-md-8'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                className='form-control'
                id='title'
                value={props.state.title}
                onChange={(e) => props.inputHandler(e, "title")}
                placeholder='Enter activity name...'
              />
            </div>
            <div className='form-group col-md-4'>
              <label htmlFor='studentHead'>Student Head</label>
              <input
                type='text'
                className='form-control'
                id='studentHead'
                placeholder='Enter student head name...'
                value={props.state.studentHead}
                onChange={(e) => props.inputHandler(e, "studentHead")}
              />
            </div> */}
          </div>

          <div className='form-row mb-4'>
            {[
              { name: "sDate", class: "form-group col-md-6" },
              { name: "eDate", class: "form-group col-md-6" },
            ].map((item, index) => (
              <div className={item.class} key={index}>
                <MyInput
                  {...props.state.formElements[item.name].elementConfig}
                  value={props.state.formElements[item.name].value}
                  change={(event) => props.inputHandler(event, item.name)}
                />
              </div>
            ))}
            {/* <div className='form-group col-md-6'>
              <label htmlFor='activityStartDate'>Start Date</label>
              <input
                id='activityStartDate'
                className='form-control flatpickr flatpickr-input active'
                type='text'
                placeholder='Select Start Date..'
                value={props.state.sDate}
                onInput={(e) => props.inputHandler(e, "sDate")}
              />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='activityEndDate'>End Date</label>
              <input
                id='activityEndDate'
                className='form-control flatpickr flatpickr-input active'
                type='text'
                placeholder='Select End Date..'
                value={props.state.eDate}
                onInput={(e) => props.inputHandler(e, "eDate")}
              />
            </div> */}
          </div>

          <div className='form-row mb-4'>
            {[
              { name: "hours", class: "form-group col-md-2" },
              { name: "points", class: "form-group col-md-2" },
            ].map((item, index) => (
              <div className={item.class} key={index}>
                <MyInput
                  {...props.state.formElements[item.name].elementConfig}
                  value={props.state.formElements[item.name].value}
                  change={(event) => props.inputHandler(event, item.name)}
                />
              </div>
            ))}
            {/* <div className='form-group col-md-2'>
              <label htmlFor='hours'>Hours</label>
              <input
                type='text'
                className='form-control'
                id='hours'
                // placeholder='Enter hours...'
                value={props.state.hours}
                onChange={(e) => props.inputHandler(e, "hours")}
              />
            </div>
            <div className='form-group col-md-2'>
              <label htmlFor='points'>Points</label>
              <input
                type='text'
                className='form-control'
                id='points'
                // placeholder='Enter points...'
                value={props.state.points}
                onChange={(e) => props.inputHandler(e, "points")}
              />
            </div> */}
            <div className='form-group col-md-8'>
              <MySelect
                {...props.state.formElements["categoryId"].elementConfig}
                value={props.state.formElements["categoryId"].value}
                change={(event) => props.inputHandler(event, "categoryId")}>
                <option value=''>Please Select....</option>
                {props.props.categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </MySelect>
              {/* <label htmlFor='category'>Category</label>
              <select
                id='category'
                className='form-control'
                value={props.state.categoryId}
                onChange={(e) => props.inputHandler(e, "categoryId")}>
                <option value=''>Please Select....</option>
                {props.props.categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.categoryName}
                  </option>
                ))}
              </select> */}
            </div>
          </div>
          <div className='form-group mb-4'>
            <MySelect
              {...props.state.formElements["noaId"].elementConfig}
              value={props.state.formElements["noaId"].value}
              change={(event) => props.inputHandler(event, "noaId")}>
              <option value=''>Please Select....</option>
              {props.props.noas.map((noa) => (
                <option value={noa.id} key={noa.id}>
                  {noa.title}
                </option>
              ))}
            </MySelect>
            {/* <label htmlFor='noa'>Nature Of Activity</label>
            <select
              id='noa'
              className='form-control'
              value={props.state.noaId}
              onChange={(e) => props.inputHandler(e, "noaId")}>
              <option value=''>Please Select....</option>
              {props.props.noas.map((noa) => (
                <option value={noa.id} key={noa.id}>
                  {noa.title}
                </option>
              ))}
            </select> */}
          </div>
          <div className='form-row mb-4'>
            <div className='form-group col-md-6'>
              <div className='form-check pl-0'>
                <div className='custom-control custom-checkbox checkbox-info text-center'>
                  <input
                    type='checkbox'
                    className='custom-control-input'
                    id='isActive'
                    checked={props.state.formElements["active"].value}
                    onChange={(e) => props.checkHandler(e, "active")}
                  />
                  <label className='custom-control-label' htmlFor='isActive'>
                    Active
                  </label>
                </div>
              </div>
            </div>
            <div className='form-group col-md-6'>
              <div className='form-check pl-0'>
                <div className='custom-control custom-checkbox checkbox-info text-center'>
                  <input
                    type='checkbox'
                    className='custom-control-input'
                    id='certificate'
                    checked={props.state.formElements["docRequired"].value}
                    onChange={(e) => props.checkHandler(e, "docRequired")}
                  />
                  <label className='custom-control-label' htmlFor='certificate'>
                    is Certificate required ?
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      {/* End Modal */}
    </>
  );
};

export default ActivityDisplay;
