import { shallowMount, mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import IndividualsTable from "@/components/IndividualsTable";
import Login from "@/components/Login";
import OrganizationsTable from "@/components/OrganizationsTable";
import ProfileModal from "@/components/ProfileModal";
import * as Mutations from "@/apollo/mutations";

Vue.use(Vuetify);

const deleteResponse = {
  data: {
    deleteIdentity: {
      uuid: "5f06473815dc415c9861680de8101813d9eb18e8",
      __typename: "DeleteIdentity"
    }
  }
};

const mergeResponse = {
  data: {
    merge: {
      uuid: "33697bad47122a2093d9edbbe179a72298971fd1",
      __typename: "Merge"
    }
  }
};

const unmergeResponse = {
  "data": {
    "unmergeIdentities": {
      "uuids": [
        "3db176be6859adac3a454c5377af81b1b7e3f8d8",
        "10982379421b80e13266db011d6e5131dd519016"
      ],
      "individuals": [
        {
          "profile": {
            "name": "Test 11",
            "id": "260",
            "isBot": false
          },
          "identities": [
            {
              "name": "Test 11",
              "source": "git",
              "email": "test11@example.net",
              "uuid": "3db176be6859adac3a454c5377af81b1b7e3f8d8",
              "username": "tes39"
            }
          ],
          "enrollments": []
        },
        {
          "profile": {
            "name": "Test 4",
            "id": "255",
            "isBot": false
          },
          "identities": [
            {
              "name": "Test 4",
              "source": "test",
              "email": "test4@example.net",
              "uuid": "10982379421b80e13266db011d6e5131dd519016",
              "username": "test4"
            }
          ],
          "enrollments": []
        }
      ]
    }
  }
};

const moveResponse = {
  data: {
    moveIdentity: {
      uuid: "7eb22d2a28e3f450ad4fbe171f156a9fab1d3971",
      individual: {
        isLocked: false,
        identities: [
          { source: "git" },
          { source: "gitlab" }
        ],
        profile: {
          name: "Test",
          id: "254"
        },
        enrollments: []
      }
    }
  }
};

const enrollResponse = {
  "data": {
    "enroll": {
      "uuid": "4df20c13824ce60c2249a9b947d6c55dc0ba26a4",
      "individual": {
        "isLocked": false,
        "identities": [
          {
            "name": "Test",
            "source": "git",
            "email": "teste@example.net",
            "uuid": "4df20c13824ce60c2249a9b947d6c55dc0ba26a4",
            "username": "test"
          }
        ],
        "profile": {
          "name": "Test",
          "id": "7"
        },
        "enrollments": [
          {
            "start": "1900-01-01T00:00:00+00:00",
            "end": "2100-01-01T00:00:00+00:00",
            "organization": {
              "name": "Organization"
            }
          }
        ]
      }
    }
  }
};

const addOrganizationResponse = {
  data: {
    addOrganization: {
      organization: {
        name: "Name",
        __typename: "OrganizationType"
      },
      __typename: "AddOrganization"
    }
  }
};

const addDomainResponse = {
  data: {
    addDomain: {
      domain: {
        domain: "domain.com",
        organization: {
          name: "Organization"
        }
      }
    }
  }
};

const addIdentityResponse = {
  data: {
    addIdentity: {
      uuid: "002bad315c34120cdfa2b1e26b3ca88ce36bc183",
      __typename: "AddIdentity"
    }
  }
};

const updateProfileResponse = {
  data: {
    updateProfile: {
      uuid: "002bad315c34120cdfa2b1e26b3ca88ce36bc183",
      individual: {
        isLocked: false,
        identities: [
          {
            uuid: "002bad315c34120cdfa2b1e26b3ca88ce36bc183",
            __typename: "IdentityType"
          }
        ],
        profile: {
          name: "Name",
          email: "email@email.com",
          gender: "gender",
          isBot: true,
          country: null,
          __typename: "ProfileType"
        },
        enrollments:[],
        __typename: "IndividualType"
      },
      __typename: "UpdateProfile"
    }
  }
};

const deleteDomainResponse = {
  data: {
    deleteDomain: {
      domain: {
        domain: "Name",
        __typename: "DomainType"
      },
      __typename: "DeleteDomain"
    }
  }
};

const tokenResponse = {
  data: {
    tokenAuth: {
      token: "eyJ0eXAiOiJKV1QiL"
    }
  }
};

const withdrawResponse = {
  data: {
    withdraw: {
      uuid: "4df20c13824ce60c2249a9b947d6c55dc0ba26a4"
    }
  }
};

describe("IndividualsTable", () => {
  test("Mock query for deleteIdentity", async () => {
    const mutate = jest.fn(() => Promise.resolve(deleteResponse));
    const wrapper = shallowMount(IndividualsTable, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      },
      propsData: {
        deleteItem: mutate,
        mergeItems: () => {},
        unmergeItems: () => {},
        moveItem: () => {},
        fetchPage: () => {},
        addIdentity: () => {},
        updateProfile: () => {},
        enroll: () => {},
        getCountries: () => {},
        lockIndividual: () => {},
        unlockIndividual: () => {},
        withdraw: () => {}
      }
    });
    const response = await Mutations.deleteIdentity(wrapper.vm.$apollo, "5f06473815dc415c9861680de8101813d9eb18e8");

    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  test("Mock query for merge", async () => {
    const mutate = jest.fn(() => Promise.resolve(mergeResponse));
    const wrapper = shallowMount(IndividualsTable, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      },
      propsData: {
        mergeItems: mutate,
        unmergeItems: () => {},
        moveItem: () => {},
        deleteItem: () => {},
        fetchPage: () => {},
        addIdentity: () => {},
        updateProfile: () => {},
        enroll: () => {},
        getCountries: () => {},
        lockIndividual: () => {},
        unlockIndividual: () => {},
        withdraw: () => {}
      }
    });
    const response = await Mutations.deleteIdentity(wrapper.vm.$apollo, "5f06473815dc415c9861680de8101813d9eb18e8");

    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  test("Mock query for unmerge", async () => {
    const mutate = jest.fn(() => Promise.resolve(unmergeResponse));
    const wrapper = shallowMount(IndividualsTable, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      },
      propsData: {
        unmergeItems: mutate,
        mergeItems: () => {},
        deleteItem: () => {},
        moveItem: () => {},
        fetchPage: () => {},
        addIdentity: () => {},
        updateProfile: () => {},
        enroll: () => {},
        getCountries: () => {},
        lockIndividual: () => {},
        unlockIndividual: () => {},
        withdraw: () => {}
      }
    });
    const response = await Mutations.unmerge(wrapper.vm.$apollo, [
      "3db176be6859adac3a454c5377af81b1b7e3f8d8",
      "10982379421b80e13266db011d6e5131dd519016"
    ]);

    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  test("Mock query for moveIdentity", async () => {
    const mutate = jest.fn(() => Promise.resolve(moveResponse));
    const wrapper = shallowMount(IndividualsTable, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      },
      propsData: {
        moveItem: mutate,
        mergeItems: () => {},
        deleteItem: () => {},
        fetchPage: () => {},
        unmergeItems: mutate,
        addIdentity: () => {},
        updateProfile: () => {},
        enroll: () => {},
        getCountries: () => {},
        lockIndividual: () => {},
        unlockIndividual: () => {},
        withdraw: () => {}
      }
    });
    const response = await Mutations.moveIdentity(
      wrapper.vm.$apollo,
      "5f06473815dc415c9861680de8101813d9eb18e8",
      "7eb22d2a28e3f450ad4fbe171f156a9fab1d3971"
    );

    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  test("Mock query for withdraw", async () => {
    const mutate = jest.fn(() => Promise.resolve(withdrawResponse));
    const wrapper = shallowMount(IndividualsTable, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      },
      propsData: {
        moveItem: () => {},
        mergeItems: () => {},
        deleteItem: () => {},
        fetchPage: () => {},
        unmergeItems: () => {},
        addIdentity: () => {},
        updateProfile: () => {},
        enroll: () => {},
        getCountries: () => {},
        lockIndividual: () => {},
        unlockIndividual: () => {},
        withdraw: mutate
      }
    });
    const response = await Mutations.withdraw(
      wrapper.vm.$apollo,
       "4df20c13824ce60c2249a9b947d6c55dc0ba26a4",
      "Organization"
    );

    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("OrganizationsTable", () => {
  test("Mock mutation for enroll", async () => {
    const mutate = jest.fn(() => Promise.resolve(enrollResponse));
    const wrapper = shallowMount(OrganizationsTable, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      },
      propsData: {
        enroll: mutate,
        fetchPage: () => {},
        addDomain: () => {},
        addOrganization: () => {},
        deleteDomain: () => {}
      }
    });

    const response = await Mutations.enroll(
      wrapper.vm.$apollo,
      "4df20c13824ce60c2249a9b947d6c55dc0ba26a4",
      "Organization"
    );

    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  test("Mock mutation for addOrganization", async () => {
    const mutate = jest.fn(() => Promise.resolve(addOrganizationResponse));
    const wrapper = shallowMount(OrganizationsTable, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      },
      propsData: {
        enroll: mutate,
        fetchPage: () => {},
        addOrganization: mutate,
        addDomain: () => {},
        deleteDomain: () => {}
      }
    });

    const response = await Mutations.addOrganization(
      wrapper.vm.$apollo, "Name");

    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  test("Mock mutation for addDomain", async () => {
    const mutate = jest.fn(() => Promise.resolve(addDomainResponse));
    const wrapper = shallowMount(OrganizationsTable, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      },
      propsData: {
        enroll: () => {},
        fetchPage: () => {},
        addDomain: mutate,
        deleteDomain: () => {},
        addOrganization: () => {}
      }
    });

    const response = await Mutations.addDomain(
      wrapper.vm.$apollo, "domain.com", "Organization"
    );

    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  test("Mock mutation for deleteDomain", async () => {
    const mutate = jest.fn(() => Promise.resolve(addDomainResponse));
    const wrapper = shallowMount(OrganizationsTable, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      },
      propsData: {
        enroll: () => {},
        fetchPage: () => {},
        addDomain: () => {},
        deleteDomain: mutate,
        addOrganization: () => {}
      }
    });

    const response = await Mutations.addDomain(
      wrapper.vm.$apollo, "domain.com", "Organization"
    );
    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  })
});

describe("ProfileModal", () => {
  test("Mock mutation for addIdentity", async () => {
    const mutate = jest.fn(() => Promise.resolve(addIdentityResponse));
    const wrapper = shallowMount(ProfileModal, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      },
      propsData: {
        addIdentity: mutate,
        updateProfile: () => {},
        enroll: () => {},
        getCountries: () => {}
      }
    });

    const response = await Mutations.addIdentity(
      wrapper.vm.$apollo,
      "email@email.com",
      "Name",
      "source",
      "username"
    );

    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  });

  test("Mock mutation for updateProfile", async () => {
    const mutate = jest.fn(() => Promise.resolve(addIdentityResponse));
    const wrapper = shallowMount(ProfileModal, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      },
      propsData: {
        addIdentity: () => {},
        updateProfile: mutate,
        enroll: () => {},
        getCountries: () => {}
      }
    });

    const response = await Mutations.addIdentity(
      wrapper.vm.$apollo,
      {
        gender: "gender",
        isBot: true
      },
      "002bad315c34120cdfa2b1e26b3ca88ce36bc183"
    );

    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("Login", () => {
  test("Mock mutation for tokenAuth", async () => {
    const mutate = jest.fn(() => Promise.resolve(tokenResponse));
    const wrapper = shallowMount(Login, {
      Vue,
      mocks: {
        $apollo: {
          mutate
        }
      }
    });

    const response = await Mutations.tokenAuth(
      wrapper.vm.$apollo,
      "username",
      "password"
    );

    expect(mutate).toBeCalled();
    expect(wrapper.element).toMatchSnapshot();
  });
});
