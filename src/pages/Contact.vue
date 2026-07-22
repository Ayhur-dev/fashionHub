<template>
  <div style="background-color: var(--bg); min-height: 100vh">
    <Navbar />

    <div
      style="
        padding-top: 100px;
        font-family:
          Futura PT,
          sans-serif;
      "
    >
      <!-- Top label -->
      <div class="py-4! md:py-15! px-5! md:px-10!">
        <p class="text-md" :style="{ color: 'var(--text-primary)' }">Company</p>

        <div
          class="mt-8! h-px w-full"
          :style="{ backgroundColor: 'var(--border-secondary)' }"
        ></div>
      </div>

      <!-- Mobile subnav dropdown -->
      <div
        class="lg:hidden flex items-center justify-between"
        style="padding: 1.25rem 1.5rem"
        :style="{ borderBottom: '1px solid var(--border)' }"
      >
        <p
          class="text-sm font-medium"
          :style="{ color: 'var(--text-primary)' }"
        >
          {{ activeSection === "contact" ? "Contact us" : "Our stores" }}
        </p>
        <button type="button" @click="showMobileSubnav = !showMobileSubnav">
          <ChevronDown
            :size="16"
            class="transition-transform duration-200"
            :style="{
              color: 'var(--text-primary)',
              transform: showMobileSubnav ? 'rotate(180deg)' : 'rotate(0deg)',
            }"
          />
        </button>
      </div>
      <div
        v-if="showMobileSubnav"
        class="lg:hidden flex flex-col"
        :style="{ borderBottom: '1px solid var(--border)' }"
      >
        <button
          type="button"
          class="text-left text-sm"
          style="padding: 0.9rem 1.5rem"
          :style="{ color: 'var(--text-primary)' }"
          @click="
            activeSection = 'contact';
            showMobileSubnav = false;
          "
        >
          Contact us
        </button>
        <button
          type="button"
          class="text-left text-sm"
          style="padding: 0.9rem 1.5rem"
          :style="{ color: 'var(--text-secondary)' }"
          @click="showMobileSubnav = false"
        >
          Our stores
        </button>
      </div>

      <!-- Body -->
      <div class="lg:flex lg:max-w-300 lg:mx-auto">
        <!-- Desktop sidebar -->
        <div
          class="hidden lg:flex lg:flex-col shrink-0 py-10! px-5! md:px-10!"
          style="width: 220px"
        >
          <p class="text-sm mb-4!" :style="{ color: 'var(--text-primary)' }">
            Contact us
          </p>
          <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">
            Our stores
          </p>
        </div>

        <!-- Form column -->
        <div class="flex-1" style="padding: 2.5rem; max-width: 700px">
          <p class="text-sm mb-8!" :style="{ color: 'var(--text-primary)' }">
            Contact us using the form below
          </p>

          <form @submit.prevent="handleSubmit" class="flex flex-col gap-8!">
            <!-- First / Last name -->
            <div class="grid grid-cols-2 gap-6!">
              <div>
                <label
                  class="text-xs block mb-1!"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  First Name *
                </label>
                <input
                  v-model="form.firstName"
                  type="text"
                  @blur="markTouched('firstName')"
                  class="w-full text-base bg-transparent outline-none pb-2!"
                  :style="{
                    borderBottom: showError(
                      'firstName',
                      form.firstName.trim() !== '',
                    )
                      ? '1px solid #dc2626'
                      : '1px solid var(--text-primary)',
                    color: 'var(--text-primary)',
                  }"
                />
                <p
                  v-if="showError('firstName', form.firstName.trim() !== '')"
                  class="text-[11px] mt-1!"
                  style="color: #dc2626"
                >
                  This field is required.
                </p>
              </div>
              <div>
                <label
                  class="text-xs block mb-1!"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  Last Name *
                </label>
                <input
                  v-model="form.lastName"
                  type="text"
                  @blur="markTouched('lastName')"
                  class="w-full text-base bg-transparent outline-none pb-2!"
                  :style="{
                    borderBottom: showError(
                      'lastName',
                      form.lastName.trim() !== '',
                    )
                      ? '1px solid #dc2626'
                      : '1px solid var(--text-primary)',
                    color: 'var(--text-primary)',
                  }"
                />
                <p
                  v-if="showError('lastName', form.lastName.trim() !== '')"
                  class="text-[11px] mt-1!"
                  style="color: #dc2626"
                >
                  This field is required.
                </p>
              </div>
            </div>

            <!-- Email -->
            <div>
              <label
                class="text-xs block mb-1! mt-4!"
                :style="{ color: 'var(--text-secondary)' }"
              >
                Email *
              </label>
              <input
                v-model="form.email"
                type="email"
                @blur="markTouched('email')"
                class="w-full text-base bg-transparent outline-none pb-2!"
                :style="{
                  borderBottom: showError('email', emailRegex.test(form.email))
                    ? '1px solid #dc2626'
                    : '1px solid var(--text-primary)',
                  color: 'var(--text-primary)',
                }"
              />
              <p
                v-if="showError('email', emailRegex.test(form.email))"
                class="text-[11px] mt-1!"
                style="color: #dc2626"
              >
                This field is required.
              </p>
            </div>

            <!-- Phone -->
            <div class="grid grid-cols-2 gap-6!">
              <div>
                <label
                  class="text-xs block mb-1! mt-4!"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  Country code
                </label>
                <select
                  v-model="form.countryCode"
                  class="w-full text-base bg-transparent outline-none pb-2!"
                  style="border-bottom: 1px solid var(--text-primary)"
                  :style="{ color: 'var(--text-primary)' }"
                >
                  <option
                    v-for="c in countryCodes"
                    :key="c.label"
                    :value="c.code"
                  >
                    {{ c.label }}
                  </option>
                </select>
              </div>
              <div>
                <label
                  class="text-xs block mb-1! mt-4!"
                  :style="{ color: 'var(--text-secondary)' }"
                >
                  Phone number
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  @blur="markTouched('phone')"
                  class="w-full text-base bg-transparent outline-none pb-2!"
                  :style="{
                    borderBottom: showError('phone', form.phone.trim() !== '')
                      ? '1px solid #dc2626'
                      : '1px solid var(--text-primary)',
                    color: 'var(--text-primary)',
                  }"
                />
                <p
                  v-if="showError('phone', form.phone.trim() !== '')"
                  class="text-[11px] mt-1!"
                  style="color: #dc2626"
                >
                  This field is required.
                </p>
              </div>
            </div>

            <!-- Order -->
            <div>
              <label
                class="text-xs block mb-1! mt-4!"
                :style="{ color: 'var(--text-secondary)' }"
              >
                Order
              </label>
              <select
                v-model="form.order"
                class="w-full text-base bg-transparent outline-none pb-2!"
                style="border-bottom: 1px solid var(--text-primary)"
                :style="{ color: 'var(--text-primary)' }"
              >
                <option value="">Select an order</option>
                <option v-for="o in orderOptions" :key="o" :value="o">
                  {{ o }}
                </option>
              </select>
            </div>

            <!-- Topic category -->
            <div>
              <label
                class="text-xs block mb-1! mt-4!"
                :style="{ color: 'var(--text-secondary)' }"
              >
                Topic category
              </label>
              <select
                v-model="form.topic"
                class="w-full text-base bg-transparent outline-none pb-2!"
                style="border-bottom: 1px solid var(--text-primary)"
                :style="{ color: 'var(--text-primary)' }"
              >
                <option value="">Select a topic</option>
                <option v-for="t in topicOptions" :key="t" :value="t">
                  {{ t }}
                </option>
              </select>
            </div>

            <!-- Helper text -->
            <p
              class="text-xs mt-10! leading-relaxed"
              :style="{ color: 'var(--text-secondary)' }"
            >
              None of these topics match your request? Please send an email to
              <a
                href="mailto:customercare@jacquemus.com"
                :style="{ color: 'var(--text-primary)' }"
                style="text-decoration: underline; text-underline-offset: 3px"
                >customercare@nyxcollective.com</a
              >
              or call +234 (9)0 34 71 39 35 from Monday to Friday from 10:00 to
              21:00, Saturdays from 10:00 to 18:00 CET.
            </p>

            <!-- Message -->
            <div>
              <textarea
                v-model="form.message"
                :maxlength="messageLimit"
                rows="6"
                placeholder="Type here (if your enquiry is about an order, do not forget to include its number)"
                @blur="markTouched('message')"
                class="w-full text-sm bg-transparent outline-none resize-none"
                style="padding: 0.75rem"
                :style="{
                  border: showError('message', form.message.trim() !== '')
                    ? '1px solid #dc2626'
                    : '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }"
              ></textarea>
              <p
                v-if="showError('message', form.message.trim() !== '')"
                class="text-[11px] mt-1!"
                style="color: #dc2626"
              >
                This field is required.
              </p>
              <p
                class="text-xs mt-1!"
                :style="{ color: 'var(--text-secondary)' }"
              >
                {{ charactersLeft }} character(s) left
              </p>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full py-4! text-xs font-medium tracking-widest uppercase transition-opacity"
              :class="isValid ? 'hover:opacity-80' : 'cursor-not-allowed'"
              :disabled="!isValid"
              :style="{
                border: `1px solid ${isValid ? 'var(--text-primary)' : 'var(--border)'}`,
                color: isValid
                  ? 'var(--text-primary)'
                  : 'var(--text-secondary)',
                backgroundColor: 'var(--bg)',
              }"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { ChevronDown } from "lucide-vue-next";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { useToast } from "../composables/stores/useToast";

const { showToast } = useToast();

const activeSection = ref<"contact" | "stores">("contact");
const showMobileSubnav = ref(false);

const messageLimit = 400;

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+234",
  phone: "",
  order: "",
  topic: "",
  message: "",
});

// Placeholder option lists — swap for real order history / topic taxonomy
// once the backend exists.
// Full country dial-code list. Nigeria stays first since it's the default
// selection (matching the person's detected location); the rest are
// alphabetical by country name. Note: several countries legitimately share
// a dial code (e.g. US/Canada both use +1) — that's expected, not a bug,
// since only the numeric code itself is actually submitted with the form.
const countryCodes = [
  { code: "+234", label: "Nigeria +234" },
  { code: "+93", label: "Afghanistan +93" },
  { code: "+355", label: "Albania +355" },
  { code: "+213", label: "Algeria +213" },
  { code: "+1", label: "American Samoa +1" },
  { code: "+376", label: "Andorra +376" },
  { code: "+244", label: "Angola +244" },
  { code: "+1", label: "Anguilla +1" },
  { code: "+1", label: "Antigua and Barbuda +1" },
  { code: "+54", label: "Argentina +54" },
  { code: "+374", label: "Armenia +374" },
  { code: "+297", label: "Aruba +297" },
  { code: "+61", label: "Australia +61" },
  { code: "+43", label: "Austria +43" },
  { code: "+994", label: "Azerbaijan +994" },
  { code: "+1", label: "Bahamas +1" },
  { code: "+973", label: "Bahrain +973" },
  { code: "+880", label: "Bangladesh +880" },
  { code: "+1", label: "Barbados +1" },
  { code: "+375", label: "Belarus +375" },
  { code: "+32", label: "Belgium +32" },
  { code: "+501", label: "Belize +501" },
  { code: "+229", label: "Benin +229" },
  { code: "+1", label: "Bermuda +1" },
  { code: "+975", label: "Bhutan +975" },
  { code: "+591", label: "Bolivia +591" },
  { code: "+387", label: "Bosnia and Herzegovina +387" },
  { code: "+267", label: "Botswana +267" },
  { code: "+55", label: "Brazil +55" },
  { code: "+246", label: "British Indian Ocean Territory +246" },
  { code: "+1", label: "British Virgin Islands +1" },
  { code: "+673", label: "Brunei +673" },
  { code: "+359", label: "Bulgaria +359" },
  { code: "+226", label: "Burkina Faso +226" },
  { code: "+257", label: "Burundi +257" },
  { code: "+855", label: "Cambodia +855" },
  { code: "+237", label: "Cameroon +237" },
  { code: "+1", label: "Canada +1" },
  { code: "+238", label: "Cape Verde +238" },
  { code: "+1", label: "Cayman Islands +1" },
  { code: "+236", label: "Central African Republic +236" },
  { code: "+235", label: "Chad +235" },
  { code: "+56", label: "Chile +56" },
  { code: "+86", label: "China +86" },
  { code: "+57", label: "Colombia +57" },
  { code: "+269", label: "Comoros +269" },
  { code: "+243", label: "Congo (DRC) +243" },
  { code: "+242", label: "Congo (Republic) +242" },
  { code: "+682", label: "Cook Islands +682" },
  { code: "+506", label: "Costa Rica +506" },
  { code: "+225", label: "Côte d'Ivoire +225" },
  { code: "+385", label: "Croatia +385" },
  { code: "+53", label: "Cuba +53" },
  { code: "+357", label: "Cyprus +357" },
  { code: "+420", label: "Czech Republic +420" },
  { code: "+45", label: "Denmark +45" },
  { code: "+253", label: "Djibouti +253" },
  { code: "+1", label: "Dominica +1" },
  { code: "+1", label: "Dominican Republic +1" },
  { code: "+593", label: "Ecuador +593" },
  { code: "+20", label: "Egypt +20" },
  { code: "+503", label: "El Salvador +503" },
  { code: "+240", label: "Equatorial Guinea +240" },
  { code: "+291", label: "Eritrea +291" },
  { code: "+372", label: "Estonia +372" },
  { code: "+268", label: "Eswatini +268" },
  { code: "+251", label: "Ethiopia +251" },
  { code: "+679", label: "Fiji +679" },
  { code: "+358", label: "Finland +358" },
  { code: "+33", label: "France +33" },
  { code: "+241", label: "Gabon +241" },
  { code: "+220", label: "Gambia +220" },
  { code: "+995", label: "Georgia +995" },
  { code: "+49", label: "Germany +49" },
  { code: "+233", label: "Ghana +233" },
  { code: "+350", label: "Gibraltar +350" },
  { code: "+30", label: "Greece +30" },
  { code: "+299", label: "Greenland +299" },
  { code: "+1", label: "Grenada +1" },
  { code: "+1", label: "Guam +1" },
  { code: "+502", label: "Guatemala +502" },
  { code: "+224", label: "Guinea +224" },
  { code: "+245", label: "Guinea-Bissau +245" },
  { code: "+592", label: "Guyana +592" },
  { code: "+509", label: "Haiti +509" },
  { code: "+504", label: "Honduras +504" },
  { code: "+852", label: "Hong Kong +852" },
  { code: "+36", label: "Hungary +36" },
  { code: "+354", label: "Iceland +354" },
  { code: "+91", label: "India +91" },
  { code: "+62", label: "Indonesia +62" },
  { code: "+98", label: "Iran +98" },
  { code: "+964", label: "Iraq +964" },
  { code: "+353", label: "Ireland +353" },
  { code: "+972", label: "Israel +972" },
  { code: "+39", label: "Italy +39" },
  { code: "+1", label: "Jamaica +1" },
  { code: "+81", label: "Japan +81" },
  { code: "+962", label: "Jordan +962" },
  { code: "+7", label: "Kazakhstan +7" },
  { code: "+254", label: "Kenya +254" },
  { code: "+686", label: "Kiribati +686" },
  { code: "+383", label: "Kosovo +383" },
  { code: "+965", label: "Kuwait +965" },
  { code: "+996", label: "Kyrgyzstan +996" },
  { code: "+856", label: "Laos +856" },
  { code: "+371", label: "Latvia +371" },
  { code: "+961", label: "Lebanon +961" },
  { code: "+266", label: "Lesotho +266" },
  { code: "+231", label: "Liberia +231" },
  { code: "+218", label: "Libya +218" },
  { code: "+423", label: "Liechtenstein +423" },
  { code: "+370", label: "Lithuania +370" },
  { code: "+352", label: "Luxembourg +352" },
  { code: "+853", label: "Macau +853" },
  { code: "+261", label: "Madagascar +261" },
  { code: "+265", label: "Malawi +265" },
  { code: "+60", label: "Malaysia +60" },
  { code: "+960", label: "Maldives +960" },
  { code: "+223", label: "Mali +223" },
  { code: "+356", label: "Malta +356" },
  { code: "+692", label: "Marshall Islands +692" },
  { code: "+222", label: "Mauritania +222" },
  { code: "+230", label: "Mauritius +230" },
  { code: "+52", label: "Mexico +52" },
  { code: "+691", label: "Micronesia +691" },
  { code: "+373", label: "Moldova +373" },
  { code: "+377", label: "Monaco +377" },
  { code: "+976", label: "Mongolia +976" },
  { code: "+382", label: "Montenegro +382" },
  { code: "+1", label: "Montserrat +1" },
  { code: "+212", label: "Morocco +212" },
  { code: "+258", label: "Mozambique +258" },
  { code: "+95", label: "Myanmar +95" },
  { code: "+264", label: "Namibia +264" },
  { code: "+674", label: "Nauru +674" },
  { code: "+977", label: "Nepal +977" },
  { code: "+31", label: "Netherlands +31" },
  { code: "+687", label: "New Caledonia +687" },
  { code: "+64", label: "New Zealand +64" },
  { code: "+505", label: "Nicaragua +505" },
  { code: "+227", label: "Niger +227" },
  { code: "+683", label: "Niue +683" },
  { code: "+850", label: "North Korea +850" },
  { code: "+389", label: "North Macedonia +389" },
  { code: "+47", label: "Norway +47" },
  { code: "+968", label: "Oman +968" },
  { code: "+92", label: "Pakistan +92" },
  { code: "+680", label: "Palau +680" },
  { code: "+970", label: "Palestine +970" },
  { code: "+507", label: "Panama +507" },
  { code: "+675", label: "Papua New Guinea +675" },
  { code: "+595", label: "Paraguay +595" },
  { code: "+51", label: "Peru +51" },
  { code: "+63", label: "Philippines +63" },
  { code: "+48", label: "Poland +48" },
  { code: "+351", label: "Portugal +351" },
  { code: "+1", label: "Puerto Rico +1" },
  { code: "+974", label: "Qatar +974" },
  { code: "+40", label: "Romania +40" },
  { code: "+7", label: "Russia +7" },
  { code: "+250", label: "Rwanda +250" },
  { code: "+1", label: "Saint Kitts and Nevis +1" },
  { code: "+1", label: "Saint Lucia +1" },
  { code: "+1", label: "Saint Vincent and the Grenadines +1" },
  { code: "+685", label: "Samoa +685" },
  { code: "+378", label: "San Marino +378" },
  { code: "+239", label: "São Tomé and Príncipe +239" },
  { code: "+966", label: "Saudi Arabia +966" },
  { code: "+221", label: "Senegal +221" },
  { code: "+381", label: "Serbia +381" },
  { code: "+248", label: "Seychelles +248" },
  { code: "+232", label: "Sierra Leone +232" },
  { code: "+65", label: "Singapore +65" },
  { code: "+421", label: "Slovakia +421" },
  { code: "+386", label: "Slovenia +386" },
  { code: "+677", label: "Solomon Islands +677" },
  { code: "+252", label: "Somalia +252" },
  { code: "+27", label: "South Africa +27" },
  { code: "+82", label: "South Korea +82" },
  { code: "+211", label: "South Sudan +211" },
  { code: "+34", label: "Spain +34" },
  { code: "+94", label: "Sri Lanka +94" },
  { code: "+249", label: "Sudan +249" },
  { code: "+597", label: "Suriname +597" },
  { code: "+46", label: "Sweden +46" },
  { code: "+41", label: "Switzerland +41" },
  { code: "+963", label: "Syria +963" },
  { code: "+886", label: "Taiwan +886" },
  { code: "+992", label: "Tajikistan +992" },
  { code: "+255", label: "Tanzania +255" },
  { code: "+66", label: "Thailand +66" },
  { code: "+670", label: "Timor-Leste +670" },
  { code: "+228", label: "Togo +228" },
  { code: "+676", label: "Tonga +676" },
  { code: "+1", label: "Trinidad and Tobago +1" },
  { code: "+216", label: "Tunisia +216" },
  { code: "+90", label: "Turkey +90" },
  { code: "+993", label: "Turkmenistan +993" },
  { code: "+1", label: "Turks and Caicos Islands +1" },
  { code: "+688", label: "Tuvalu +688" },
  { code: "+256", label: "Uganda +256" },
  { code: "+380", label: "Ukraine +380" },
  { code: "+971", label: "United Arab Emirates +971" },
  { code: "+44", label: "United Kingdom +44" },
  { code: "+1", label: "United States +1" },
  { code: "+598", label: "Uruguay +598" },
  { code: "+998", label: "Uzbekistan +998" },
  { code: "+678", label: "Vanuatu +678" },
  { code: "+379", label: "Vatican City +379" },
  { code: "+58", label: "Venezuela +58" },
  { code: "+84", label: "Vietnam +84" },
  { code: "+967", label: "Yemen +967" },
  { code: "+260", label: "Zambia +260" },
  { code: "+263", label: "Zimbabwe +263" },
];

const orderOptions = ["I don't have an order number", "Order #12345"];

const topicOptions = [
  "Order tracking",
  "Returns & refunds",
  "Product information",
  "Website issue",
  "Other",
];

const charactersLeft = computed(() => messageLimit - form.message.length);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Tracks which fields the user has left (blurred) at least once.
const touched = reactive({
  firstName: false,
  lastName: false,
  email: false,
  phone: false,
  message: false,
});

// Becomes true after a failed submit attempt, so untouched fields
// also show errors immediately (not just on blur).
const submitAttempted = ref(false);

const markTouched = (field: keyof typeof touched) => {
  touched[field] = true;
};

// Returns true if a given field should show its error state right now.
const showError = (field: keyof typeof touched, isFieldValid: boolean) =>
  (touched[field] || submitAttempted.value) && !isFieldValid;

const isValid = computed(
  () =>
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    emailRegex.test(form.email) &&
    form.phone.trim() !== "" &&
    form.message.trim() !== "",
);

const handleSubmit = () => {
  submitAttempted.value = true;
  if (!isValid.value) return;

  // TEMP MOCK — no backend yet. Replace with a real API call once
  // available; keep the success toast + reset on a 2xx response.
  console.log("Contact form submitted:", { ...form });
  showToast("Message sent");

  form.firstName = "";
  form.lastName = "";
  form.email = "";
  form.phone = "";
  form.order = "";
  form.topic = "";
  form.message = "";
};
</script>
