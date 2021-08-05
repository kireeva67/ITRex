class Model {
  constructor() {
    this.queue = [];
    this.listWithResolutions = [];
    this.currentPatient = null;
    this.currentDoctorsSearch = null;
  }

  addResolution(patient, resolution) {
    const patientWithResolution = {
      id: patient.id,
      name: patient.name,
      resolution: resolution,
    };
    this.listWithResolutions.push(patientWithResolution);
  }

  isCurrentPatientHasResolution() {
    let currentId = this.currentPatient.id;
    for (let key in this.listWithResolutions) {
      if (this.listWithResolutions[key]["id"] === currentId) {
        return true;
      } else {
        return false;
      }
    }
  }

  addPatientToQueue(patientName, patientReason) {
    const patient = {
      id: this.queue.length > 0 ? this.queue[this.queue.length - 1].id + 1 : 1,
      name: patientName,
      reason: patientReason,
    };
    let isPatientexist = false;
    for (let key in this.queue) {
      let item = this.queue[key];
      if (item.name === patientName) {
        isPatientexist = true;
        item.reason = `${item.reason}, ${patientReason}`;
        break;
      }
    }
    if (!isPatientexist) {
      this.queue.push(patient);
    }
    this.onQueueChanged(this.queue);
  }

  bindQueueChanged(callback) {
    this.onQueueChanged = callback;
  }

  getNextPatient() {
    if (this.queue.length !== 0) {
      let nextPatient = this.queue.shift();
      this.currentPatient = nextPatient;
      return nextPatient;
    } else {
      return false;
    }
  }

  getCurrentPatient() {
    return this.currentPatient;
  }

  filterBySearch(search) {
    let filteredResults = this.listWithResolutions.filter((patient) => {
      return patient.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    return filteredResults;
  }

  filterByPatientSearch(patientSearch) {
    return this.filterBySearch(patientSearch);
  }

  filterByDoctorSearch(doctorSearch) {
    let filterResult = this.filterBySearch(doctorSearch);
    this.currentDoctorsSearch = filterResult;
    return filterResult;
  }

  deletePatient() {
    for (let key in this.listWithResolutions) {
      let item = this.listWithResolutions[key];
      if (
        item.id === this.currentDoctorsSearch[0].id &&
        item.name === this.currentDoctorsSearch[0].name &&
        item.resolution === this.currentDoctorsSearch[0].resolution
      ) {
        this.listWithResolutions.splice(key, 1);
        return true;
      }
    }
    return false;
  }
}

class View {
  constructor() {
    this.inputForName = this.getElement("#inputToSetName");
    this.formForPatient = this.getElement("#formForAddingPatient");
    this.queueElement = this.getElement("#queue");
    this.spanForNextPatient = this.getElement("#spanForNextPatient");
    this.next = this.getElement("#next");
    this.inputForResolution = this.getElement("#inputToSetResolution");
    this.formForResolution = this.getElement("#formForResolution");
    this.inputForReason = this.getElement("#inputToSetReason");
    this.formForPatientSearch = this.getElement("#formForPatientSearch");
    this.inputForPatientSearch = this.getElement("#inputForPatientSearch");
    this.listForPatientSearchResult = this.getElement(
      "#listForPatientSearchResult"
    );
    this.formForDoctorSearch = this.getElement("#formForDoctorSearch");
    this.inputForDoctorSearch = this.getElement("#inputForDoctorSearch");
    this.listForDoctorSearchResult = this.getElement(
      "#listForDoctorSearchResult"
    );
    this.deletePatientButton = this.getElement("#deletePatientButton");
  }

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  get _patientName() {
    return this.inputForName.value;
  }

  get _resolution() {
    return this.inputForResolution.value;
  }

  get _reason() {
    return this.inputForReason.value;
  }

  get _patientSearch() {
    return this.inputForPatientSearch.value;
  }

  get _doctorSearch() {
    return this.inputForDoctorSearch.value;
  }

  _resetValue(tag) {
    tag.value = "";
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  bindAddPatient(patientHandler) {
    this.formForPatient.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this._patientName && this._reason) {
        patientHandler(this._patientName, this._reason);
        this._resetValue(this.inputForName);
        this._resetValue(this.inputForReason);
      } else {
        alert("Please, fill all fields");
      }
    });
  }

  bindAddResolution(currentPatientHandler, addResolution) {
    this.formForResolution.addEventListener("submit", (event) => {
      event.preventDefault();

      if (
        this._resolution &&
        this.spanForNextPatient.textContent !== "The queue is empty"
      ) {
        addResolution(currentPatientHandler(), this._resolution);
        this._resetValue(this.inputForResolution);
        this.spanForNextPatient.textContent = "";
      }
    });
  }

  displayQueue(queue) {
    while (this.queueElement.firstChild) {
      this.queueElement.removeChild(this.queueElement.firstChild);
    }
    if (queue.length === 0) {
      const p = this.createElement("p");
      p.textContent = "The queue is empty";
      this.queueElement.append(p);
    } else {
      queue.slice(0, 5).forEach((patient) => {
        const li = this.createElement("li");
        li.id = patient.id;
        li.textContent = patient.name;
        this.queueElement.append(li);
      });
      const p = this.createElement("p");
      p.textContent = `Total: ${queue.length}`;
      this.queueElement.append(p);
    }
  }

  bindGetNextPatient(
    getNextPatient,
    queue,
    isResolurionExist,
    currentPatientHandler
  ) {
    this.next.addEventListener("click", () => {
      let currentPatient = currentPatientHandler();
      if (
        currentPatient === null ||
        this.spanForNextPatient.textContent === ""
      ) {
        this.displayNextPatient(getNextPatient());
        this.displayQueue(queue);
      } else {
        if (isResolurionExist()) {
          this.displayNextPatient(getNextPatient());
          this.displayQueue(queue);
        } else {
          alert("Please, add resolution to current patient");
        }
      }
    });
  }

  displayNextPatient(nextPatient) {
    if (nextPatient) {
      spanForNextPatient.textContent = `${nextPatient.name} (${nextPatient.reason})`;
    } else {
      this._resetValue(this.spanForNextPatient);
      spanForNextPatient.textContent = "The queue is empty";
    }
  }

  bindPatientSearchResult(handlePatientSearch) {
    this.formForPatientSearch.addEventListener("submit", (event) => {
      event.preventDefault();

      if (this._patientSearch) {
        this.displayFoundResolutionBySearch(
          handlePatientSearch(this._patientSearch),
          this.listForPatientSearchResult
        );
        this._resetValue(this.inputForPatientSearch);
      } else {
        const p = this.createElement("p");
        p.textContent = "Type something to search";
        this.listForPatientSearchResult.append(p);
      }
    });
  }

  bindDoctorSearchResult(handleDoctorSearch) {
    this.formForDoctorSearch.addEventListener("submit", (event) => {
      event.preventDefault();

      if (this._doctorSearch) {
        this.displayFoundResolutionBySearch(
          handleDoctorSearch(this._doctorSearch),
          this.listForDoctorSearchResult
        );
        this._resetValue(this.inputForDoctorSearch);
      }
    });
  }

  displayFoundResolutionBySearch(searchResults, tag) {
    while (tag.firstChild) {
      tag.removeChild(tag.firstChild);
    }
    if (searchResults.length === 0) {
      const p = this.createElement("p");
      p.textContent = "The patient you are looking for does not exist";
      tag.append(p);
    } else {
      searchResults.forEach((result) => {
        const li = this.createElement("li");
        const divName = this.createElement("div");
        divName.textContent = `Name: ${result.name}`;
        const divResolution = this.createElement("div");
        divResolution.textContent = `Resolution: ${result.resolution}`;
        li.append(divName, divResolution);
        tag.append(li);
      });
    }
  }

  bindDeletePatientAfterSearch(currentDoctorsSearch, handlerDelete) {
    this.deletePatientButton.addEventListener("click", () => {
      if (handlerDelete()) {
        let deleteApprove = confirm("Delete this patient?");
        if (deleteApprove) {
          setTimeout(() => alert("Patient was deleted"), 0);
          this.listForDoctorSearchResult.removeChild(
            this.listForDoctorSearchResult.firstChild
          );
        }
      }
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.onQueueChanged(this.model.queue);

    this.view.bindAddPatient(this.handleAddPatient);
    this.model.bindQueueChanged(this.onQueueChanged);
    this.view.bindGetNextPatient(
      this.model.getNextPatient.bind(this.model),
      this.model.queue,
      this.model.isCurrentPatientHasResolution.bind(this.model),
      this.model.getCurrentPatient.bind(this.model)
    );
    this.view.bindAddResolution(
      this.model.getCurrentPatient.bind(this.model),
      this.model.addResolution.bind(this.model)
    );
    this.view.bindPatientSearchResult(this.handlePatientSearch);
    this.view.bindDoctorSearchResult(this.handleDoctorSearch);
    this.view.bindDeletePatientAfterSearch(
      this.model.currentDoctorsSearch,
      this.model.deletePatient.bind(this.model)
    );
  }

  onQueueChanged = (queue) => {
    this.view.displayQueue(queue);
  };

  handleAddPatient = (patient, reason) => {
    this.model.addPatientToQueue(patient, reason);
  };

  handlePatientSearch = (patientSearch) => {
    return this.model.filterByPatientSearch(patientSearch);
  };

  handleDoctorSearch = (doctorSearch) => {
    return this.model.filterByDoctorSearch(doctorSearch);
  };
}

const app = new Controller(new Model(), new View());
